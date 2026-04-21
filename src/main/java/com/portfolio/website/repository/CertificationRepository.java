package com.portfolio.website.repository;

import com.portfolio.website.domain.Certification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CertificationRepository extends JpaRepository<Certification, Long> {

    List<Certification> findAllByOrderBySortOrderAsc();
}
