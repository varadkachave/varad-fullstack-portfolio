package com.portfolio.website.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class ContactForm {

    @NotBlank(message = "Please add your name.")
    @Size(max = 80, message = "Name should be under 80 characters.")
    private String name;

    @NotBlank(message = "Please add your email address.")
    @Email(message = "Enter a valid email address.")
    @Size(max = 140, message = "Email should be under 140 characters.")
    private String email;

    @Size(max = 120, message = "Company should be under 120 characters.")
    private String company;

    @Size(max = 60, message = "Budget should be under 60 characters.")
    private String budget;

    @NotBlank(message = "Tell me a little about the project.")
    @Size(min = 20, max = 2000, message = "Message should be between 20 and 2000 characters.")
    private String message;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public String getBudget() {
        return budget;
    }

    public void setBudget(String budget) {
        this.budget = budget;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
