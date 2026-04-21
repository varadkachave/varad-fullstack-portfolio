package com.portfolio.website.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "profiles")
public class Profile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 80)
    private String fullName;

    @Column(nullable = false, length = 160)
    private String headline;

    @Column(nullable = false, length = 1200)
    private String heroSummary;

    @Column(nullable = false, length = 2000)
    private String aboutSummary;

    @Column(nullable = false, length = 120)
    private String location;

    @Column(nullable = false, length = 160)
    private String email;

    @Column(length = 40)
    private String phone;

    @Column(length = 140)
    private String availability;

    @Column(length = 255)
    private String linkedinUrl;

    @Column(length = 255)
    private String githubUrl;

    @Column(length = 255)
    private String resumeUrl;

    @Column(nullable = false)
    private Integer yearsExperience;

    @Column(nullable = false)
    private Integer projectsDelivered;

    @Column(nullable = false)
    private Integer happyClients;

    protected Profile() {
    }

    public Profile(
            String fullName,
            String headline,
            String heroSummary,
            String aboutSummary,
            String location,
            String email,
            String phone,
            String availability,
            String linkedinUrl,
            String githubUrl,
            String resumeUrl,
            Integer yearsExperience,
            Integer projectsDelivered,
            Integer happyClients
    ) {
        this.fullName = fullName;
        this.headline = headline;
        this.heroSummary = heroSummary;
        this.aboutSummary = aboutSummary;
        this.location = location;
        this.email = email;
        this.phone = phone;
        this.availability = availability;
        this.linkedinUrl = linkedinUrl;
        this.githubUrl = githubUrl;
        this.resumeUrl = resumeUrl;
        this.yearsExperience = yearsExperience;
        this.projectsDelivered = projectsDelivered;
        this.happyClients = happyClients;
    }

    public Long getId() {
        return id;
    }

    public String getFullName() {
        return fullName;
    }

    public String getHeadline() {
        return headline;
    }

    public String getHeroSummary() {
        return heroSummary;
    }

    public String getAboutSummary() {
        return aboutSummary;
    }

    public String getLocation() {
        return location;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getAvailability() {
        return availability;
    }

    public String getLinkedinUrl() {
        return linkedinUrl;
    }

    public String getGithubUrl() {
        return githubUrl;
    }

    public String getResumeUrl() {
        return resumeUrl;
    }

    public Integer getYearsExperience() {
        return yearsExperience;
    }

    public Integer getProjectsDelivered() {
        return projectsDelivered;
    }

    public Integer getHappyClients() {
        return happyClients;
    }
}
