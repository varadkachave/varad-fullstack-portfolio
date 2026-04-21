package com.portfolio.website.service;

import com.portfolio.website.domain.Certification;
import com.portfolio.website.domain.ContactMessage;
import com.portfolio.website.domain.Education;
import com.portfolio.website.domain.Experience;
import com.portfolio.website.domain.Profile;
import com.portfolio.website.domain.Project;
import com.portfolio.website.domain.Skill;
import com.portfolio.website.dto.ContactForm;
import com.portfolio.website.repository.CertificationRepository;
import com.portfolio.website.repository.ContactMessageRepository;
import com.portfolio.website.repository.EducationRepository;
import com.portfolio.website.repository.ExperienceRepository;
import com.portfolio.website.repository.ProfileRepository;
import com.portfolio.website.repository.ProjectRepository;
import com.portfolio.website.repository.SkillRepository;
import org.springframework.stereotype.Service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PortfolioService {

    private final ProfileRepository profileRepository;
    private final SkillRepository skillRepository;
    private final ProjectRepository projectRepository;
    private final ExperienceRepository experienceRepository;
    private final EducationRepository educationRepository;
    private final CertificationRepository certificationRepository;
    private final ContactMessageRepository contactMessageRepository;

    public PortfolioService(
            ProfileRepository profileRepository,
            SkillRepository skillRepository,
            ProjectRepository projectRepository,
            ExperienceRepository experienceRepository,
            EducationRepository educationRepository,
            CertificationRepository certificationRepository,
            ContactMessageRepository contactMessageRepository
    ) {
        this.profileRepository = profileRepository;
        this.skillRepository = skillRepository;
        this.projectRepository = projectRepository;
        this.experienceRepository = experienceRepository;
        this.educationRepository = educationRepository;
        this.certificationRepository = certificationRepository;
        this.contactMessageRepository = contactMessageRepository;
    }

    public Profile getProfile() {
        return profileRepository.findTopByOrderByIdAsc()
                .orElseThrow(() -> new IllegalStateException("Portfolio profile has not been seeded yet."));
    }

    public Map<String, List<Skill>> getSkillsByCategory() {
        return skillRepository.findAllByOrderByCategoryAscSortOrderAscNameAsc().stream()
                .collect(Collectors.groupingBy(Skill::getCategory, LinkedHashMap::new, Collectors.toList()));
    }

    public List<Project> getFeaturedProjects() {
        return projectRepository.findAllByFeaturedTrueOrderBySortOrderAsc();
    }

    public List<Experience> getExperiences() {
        return experienceRepository.findAllByOrderBySortOrderAsc();
    }

    public List<Education> getEducationHistory() {
        return educationRepository.findAllByOrderBySortOrderAsc();
    }

    public List<Certification> getCertifications() {
        return certificationRepository.findAllByOrderBySortOrderAsc();
    }

    public void saveContactMessage(ContactForm form) {
        ContactMessage message = new ContactMessage(
                form.getName().trim(),
                form.getEmail().trim(),
                trimToNull(form.getCompany()),
                trimToNull(form.getBudget()),
                form.getMessage().trim()
        );
        contactMessageRepository.save(message);
    }

    private String trimToNull(String value) {
        if (value == null) {
            return null;
        }

        String trimmed = value.trim();
        return trimmed.isEmpty() ? null : trimmed;
    }
}
