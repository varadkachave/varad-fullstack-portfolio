package com.portfolio.website.repository;

import com.portfolio.website.domain.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, Long> {

    Optional<Profile> findTopByOrderByIdAsc();
}
