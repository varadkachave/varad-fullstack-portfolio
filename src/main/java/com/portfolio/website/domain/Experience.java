package com.portfolio.website.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "experiences")
public class Experience {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 120)
    private String roleTitle;

    @Column(nullable = false, length = 120)
    private String company;

    @Column(nullable = false, length = 80)
    private String period;

    @Column(nullable = false, length = 80)
    private String location;

    @Column(nullable = false, length = 1500)
    private String summary;

    @Column(nullable = false, length = 2000)
    private String highlights;

    @Column(nullable = false)
    private Integer sortOrder;

    protected Experience() {
    }

    public Experience(
            String roleTitle,
            String company,
            String period,
            String location,
            String summary,
            String highlights,
            Integer sortOrder
    ) {
        this.roleTitle = roleTitle;
        this.company = company;
        this.period = period;
        this.location = location;
        this.summary = summary;
        this.highlights = highlights;
        this.sortOrder = sortOrder;
    }

    public Long getId() {
        return id;
    }

    public String getRoleTitle() {
        return roleTitle;
    }

    public String getCompany() {
        return company;
    }

    public String getPeriod() {
        return period;
    }

    public String getLocation() {
        return location;
    }

    public String getSummary() {
        return summary;
    }

    public String getHighlights() {
        return highlights;
    }

    public Integer getSortOrder() {
        return sortOrder;
    }
}
