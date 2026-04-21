package com.portfolio.website.repository;

import com.portfolio.website.domain.Project;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProjectRepository extends JpaRepository<Project, Long> {

    List<Project> findAllByFeaturedTrueOrderBySortOrderAsc();
}
