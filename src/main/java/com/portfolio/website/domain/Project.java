package com.portfolio.website.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 120)
    private String title;

    @Column(nullable = false, length = 80)
    private String category;

    @Column(nullable = false, length = 1500)
    private String summary;

    @Column(nullable = false, length = 800)
    private String resultHighlight;

    @Column(nullable = false, length = 500)
    private String techStack;

    @Column(length = 255)
    private String liveUrl;

    @Column(length = 255)
    private String repoUrl;

    @Column(nullable = false, length = 40)
    private String accent;

    @Column(nullable = false)
    private boolean featured;

    @Column(nullable = false)
    private Integer sortOrder;

    protected Project() {
    }

    public Project(
            String title,
            String category,
            String summary,
            String resultHighlight,
            String techStack,
            String liveUrl,
            String repoUrl,
            String accent,
            boolean featured,
            Integer sortOrder
    ) {
        this.title = title;
        this.category = category;
        this.summary = summary;
        this.resultHighlight = resultHighlight;
        this.techStack = techStack;
        this.liveUrl = liveUrl;
        this.repoUrl = repoUrl;
        this.accent = accent;
        this.featured = featured;
        this.sortOrder = sortOrder;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getCategory() {
        return category;
    }

    public String getSummary() {
        return summary;
    }

    public String getResultHighlight() {
        return resultHighlight;
    }

    public String getTechStack() {
        return techStack;
    }

    public String getLiveUrl() {
        return liveUrl;
    }

    public String getRepoUrl() {
        return repoUrl;
    }

    public String getAccent() {
        return accent;
    }

    public boolean isFeatured() {
        return featured;
    }

    public Integer getSortOrder() {
        return sortOrder;
    }
}
