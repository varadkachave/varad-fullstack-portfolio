package com.portfolio.website.domain;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "education")
public class Education {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 160)
    private String institution;

    @Column(nullable = false, length = 160)
    private String degree;

    @Column(nullable = false, length = 80)
    private String period;

    @Column(nullable = false, length = 80)
    private String location;

    @Column(nullable = false, length = 1200)
    private String notes;

    @Column(nullable = false)
    private Integer sortOrder;

    protected Education() {
    }

    public Education(String institution, String degree, String period, String location, String notes, Integer sortOrder) {
        this.institution = institution;
        this.degree = degree;
        this.period = period;
        this.location = location;
        this.notes = notes;
        this.sortOrder = sortOrder;
    }

    public Long getId() {
        return id;
    }

    public String getInstitution() {
        return institution;
    }

    public String getDegree() {
        return degree;
    }

    public String getPeriod() {
        return period;
    }

    public String getLocation() {
        return location;
    }

    public String getNotes() {
        return notes;
    }

    public Integer getSortOrder() {
        return sortOrder;
    }
}
