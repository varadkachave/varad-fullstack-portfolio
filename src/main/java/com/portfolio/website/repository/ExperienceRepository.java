package com.portfolio.website.repository;

import com.portfolio.website.domain.Experience;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ExperienceRepository extends JpaRepository<Experience, Long> {

    List<Experience> findAllByOrderBySortOrderAsc();
}
