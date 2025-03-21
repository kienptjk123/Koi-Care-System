package com.swpproject.koi_care_system.service.Blog;

import com.swpproject.koi_care_system.dto.BlogDto;
import com.swpproject.koi_care_system.exceptions.ResourceNotFoundException;
import com.swpproject.koi_care_system.mapper.BlogMapper;
import com.swpproject.koi_care_system.models.Blog;
import com.swpproject.koi_care_system.models.Tag;
import com.swpproject.koi_care_system.models.User;
import com.swpproject.koi_care_system.payload.request.BlogCreateRequest;
import com.swpproject.koi_care_system.payload.request.BlogUpdateRequest;
import com.swpproject.koi_care_system.repository.BlogRepository;
import com.swpproject.koi_care_system.repository.TagRepository;
import com.swpproject.koi_care_system.repository.UserRepository;
import com.swpproject.koi_care_system.service.imageBlobStorage.ImageStorage;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BlogService implements IBlogService {
    BlogRepository blogRepository;
    BlogMapper blogMapper;
    UserRepository userRepository;
    TagRepository tagRepository;
    ImageStorage imageStorage;
    @Override
    @PreAuthorize("hasRole('ADMIN') or hasRole('SHOP')")
    public BlogDto createBlog(BlogCreateRequest blogCreateRequest, String username) throws IOException {
        if (blogRepository.existsByBlogTitle(blogCreateRequest.getBlogTitle())) {
            throw new RuntimeException("Blog already exists");
        }
        Blog blog = blogMapper.mapToBlog(blogCreateRequest);
        if(blogCreateRequest.getFile()!=null)
            blog.setBlogImage(!blogCreateRequest.getFile().isEmpty() ? imageStorage.uploadImage(blogCreateRequest.getFile()) : "https://koicaresystemv4.blob.core.windows.net/koicarestorage/defaultBlog.png");
        else
            blog.setBlogImage("https://koicaresystemv3.blob.core.windows.net/koicarestorage/defaultBlog.png");
        if (blogCreateRequest.getTagIds() == null || blogCreateRequest.getTagIds().isEmpty()) {
            throw new RuntimeException("Tags cannot be null");
        }
        blog.setBlogDate(java.time.LocalDate.now());
        Set<Tag> tags = new HashSet<>();
        for (int tagId : blogCreateRequest.getTagIds()) {
            Tag tag = tagRepository.findById(tagId).orElseThrow(() -> new RuntimeException("Tag not found"));
            tags.add(tag);
        }
        blog.setTags(tags);
        blog.setUser(userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found")));

        return blogMapper.mapToBlogDto(blogRepository.save(blog));
    }
    @Override
    @PreAuthorize("hasRole('ADMIN') or hasRole('SHOP')")
    public BlogDto updateBlog(int id, BlogUpdateRequest blogUpdateRequest) {
        Blog blog = blogRepository.findById(id).orElseThrow(() -> new RuntimeException("Blog not found"));
        if (!blogUpdateRequest.getBlogTitle().equals(blog.getBlogTitle())) {
            if (blogRepository.existsByBlogTitle(blogUpdateRequest.getBlogTitle())) {
                throw new RuntimeException("Blog title already exists");
            }
        }
        if(blogUpdateRequest.getFile()!=null)
            if(!blogUpdateRequest.getFile().isEmpty()){
                try{
                    if (!blog.getBlogImage().equals("https://koicaresystemv3.blob.core.windows.net/koicarestorage/defaultBlog.png"))
                        imageStorage.deleteImage(blog.getBlogImage());
                    blog.setBlogImage(imageStorage.uploadImage(blogUpdateRequest.getFile()));
                }catch (Exception e){
                    throw new RuntimeException(e);
                }
            }
        if (blogUpdateRequest.getTagIds() == null || blogUpdateRequest.getTagIds().isEmpty()) {
            throw new RuntimeException("Tags cannot be null");
        }
        blogMapper.updateBlog(blog, blogUpdateRequest);
        Set<Tag> tags = new HashSet<>();
        for (int tagId : blogUpdateRequest.getTagIds()) {
            Tag tag = tagRepository.findById(tagId).orElseThrow(() -> new RuntimeException("Tag not found"));
            tags.add(tag);
        }
        blog.setTags(tags);
        return blogMapper.mapToBlogDto(blogRepository.save(blog));
    }

    @Override
    @PreAuthorize("hasRole('ADMIN') or hasRole('SHOP')")
    public void deleteBlog(int id) {
        blogRepository.findById(id).ifPresentOrElse(blog -> {
            if (!blog.getBlogImage().equals("https://koicaresystemv3.blob.core.windows.net/koicarestorage/defaultBlog.png")) {
                try {
                    imageStorage.deleteImage(blog.getBlogImage());
                }catch (Exception e) {
                    throw new RuntimeException(e);
                }
                blogRepository.delete(blog);
            }
        },()->{
            throw new ResourceNotFoundException("Blog not found!");
        });
    }

    @Override
    public List<BlogDto> getAllBlogs() {
        List<Blog> blogs = blogRepository.findAll();
        return blogs.stream().map(blogMapper::mapToBlogDto).toList();
    }

    @Override
    public BlogDto getBlogById(int id) {
        return blogRepository.findById(id).map(blogMapper::mapToBlogDto).orElseThrow(() -> new RuntimeException("Blog not found"));
    }

    @Override
    public List<BlogDto> getBlogByTag(int tagId) {
        Tag tag = tagRepository.findById(tagId).orElseThrow(() -> new RuntimeException("Tag not found"));
        List<Blog> blogs = blogRepository.findByTags(tag);
        return blogs.stream().map(blogMapper::mapToBlogDto).toList();
    }

    @Override
    public List<BlogDto> getBlogByUsername(long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        List<Blog> blogs = blogRepository.findByUser(user);
        return blogs.stream().map(blogMapper::mapToBlogDto).toList();
    }

    @Override
    public List<BlogDto> searchBlogs(String keyword) {
        List<Blog> blogs = blogRepository.findByBlogTitleContaining(keyword);
        return blogs.stream().map(blogMapper::mapToBlogDto).toList();
    }
}