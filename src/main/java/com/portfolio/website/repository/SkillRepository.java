package com.portfolio.website.repository;

import com.portfolio.website.domain.Skill;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SkillRepository extends JpaRepository<Skill, Long> {

    List<Skill> findAllByOrderByCategoryAscSortOrderAscNameAsc();
}
