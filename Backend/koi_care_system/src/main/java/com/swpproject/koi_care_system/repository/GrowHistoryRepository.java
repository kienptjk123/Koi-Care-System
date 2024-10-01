package com.swpproject.koi_care_system.repository;

import com.swpproject.koi_care_system.models.GrowHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GrowHistoryRepository extends JpaRepository<GrowHistory, Long> {
    @Query("SELECT g.id FROM GrowHistory g WHERE g.koiFish.id = :koiFishId ORDER BY g.createDate DESC, g.id DESC LIMIT 1")
        //:koiFishId is a placeholder
    Long findLatestByKoiFishId(Long koiFishId);

    @Query("SELECT g FROM GrowHistory g WHERE g.koiFish.id = :koiFishId ORDER BY g.createDate DESC, g.id DESC")
    List<GrowHistory> findAllByKoiFishId(Long koiFishId);
}
