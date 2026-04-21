package com.portfolio.website.service;

import com.portfolio.website.domain.Certification;
import com.portfolio.website.domain.Education;
import com.portfolio.website.domain.Experience;
import com.portfolio.website.domain.Profile;
import com.portfolio.website.domain.Project;
import com.portfolio.website.domain.Skill;
import com.portfolio.website.repository.CertificationRepository;
import com.portfolio.website.repository.EducationRepository;
import com.portfolio.website.repository.ExperienceRepository;
import com.portfolio.website.repository.ProfileRepository;
import com.portfolio.website.repository.ProjectRepository;
import com.portfolio.website.repository.SkillRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PortfolioDataInitializer implements ApplicationRunner {

    private final ProfileRepository profileRepository;
    private final SkillRepository skillRepository;
    private final ProjectRepository projectRepository;
    private final ExperienceRepository experienceRepository;
    private final EducationRepository educationRepository;
    private final CertificationRepository certificationRepository;

    public PortfolioDataInitializer(
            ProfileRepository profileRepository,
            SkillRepository skillRepository,
            ProjectRepository projectRepository,
            ExperienceRepository experienceRepository,
            EducationRepository educationRepository,
            CertificationRepository certificationRepository
    ) {
        this.profileRepository = profileRepository;
        this.skillRepository = skillRepository;
        this.projectRepository = projectRepository;
        this.experienceRepository = experienceRepository;
        this.educationRepository = educationRepository;
        this.certificationRepository = certificationRepository;
    }

    @Override
    public void run(ApplicationArguments args) {
        seedProfile();
        seedSkills();
        seedProjects();
        seedExperience();
        seedEducation();
        seedCertifications();
    }

    private void seedProfile() {
        if (profileRepository.count() > 0) {
            return;
        }

        profileRepository.save(new Profile(
                "Varad M. Kachave",
                "MCA student and Java full-stack developer building practical web applications with Spring Boot, MySQL, and REST APIs.",
                "Motivated and detail-oriented, I enjoy turning strong Java fundamentals into real web products. I am currently looking for entry-level opportunities where I can contribute, keep learning, and grow through hands-on software development work.",
                "I am an MCA student based in Pune with a strong foundation in Java, web development, and database management. My experience spans a Java full-stack internship, student coordination work, and project delivery across Spring Boot, JSP, JDBC, and MySQL. I care about clean problem solving, reliable backend logic, and user experiences that feel simple and clear.",
                "Pune, Maharashtra",
                "varadkachave203@gmail.com",
                "8530290301",
                "Open to entry-level Java and full-stack development opportunities",
                "https://www.linkedin.com/in/varad-kachave",
                "https://github.com/varadkachave",
                "",
                2,
                2,
                5
        ));
    }

    private void seedSkills() {
        if (skillRepository.count() > 0) {
            return;
        }

        skillRepository.saveAll(List.of(
                new Skill("Java", "Languages", "Advanced", 1),
                new Skill("SQL", "Languages", "Advanced", 2),
                new Skill("Python", "Languages", "Working knowledge", 3),
                new Skill("C++", "Languages", "Working knowledge", 4),
                new Skill("HTML", "Frontend", "Strong", 1),
                new Skill("CSS", "Frontend", "Strong", 2),
                new Skill("JavaScript", "Frontend", "Strong", 3),
                new Skill("Bootstrap", "Frontend", "Strong", 4),
                new Skill("Spring Boot", "Backend and APIs", "Advanced", 1),
                new Skill("JSP", "Backend and APIs", "Strong", 2),
                new Skill("Servlets", "Backend and APIs", "Strong", 3),
                new Skill("REST APIs", "Backend and APIs", "Advanced", 4),
                new Skill("MySQL", "Database and Tools", "Advanced", 1),
                new Skill("JDBC", "Database and Tools", "Strong", 2),
                new Skill("Git", "Database and Tools", "Strong", 3),
                new Skill("GitHub", "Database and Tools", "Strong", 4),
                new Skill("MVC", "Core Concepts", "Strong", 1),
                new Skill("OOP", "Core Concepts", "Strong", 2),
                new Skill("Problem Solving", "Core Concepts", "Strong", 3),
                new Skill("Teamwork", "Core Concepts", "Strong", 4)
        ));
    }

    private void seedProjects() {
        if (projectRepository.count() > 0) {
            return;
        }

        projectRepository.saveAll(List.of(
                new Project(
                        "Digital Credit Ledger System",
                        "Spring Boot Backend Project",
                        "A digital ledger platform designed to manage high-volume credit transactions with a secure backend, optimized queries, and role-based access for admins and users.",
                        "Handled 500 plus transactions, shipped 10 plus REST APIs, and improved performance by 40 percent through query optimization and indexing.",
                        "Java, Spring Boot, MySQL, REST APIs, Role-Based Access",
                        "",
                        "https://github.com/varadkachave",
                        "ember",
                        true,
                        1
                ),
                new Project(
                        "LifeSure-AgentMate",
                        "JSP Web Platform",
                        "A web application connecting insurance clients with agents through a structured multi-role workflow for request handling, account management, and session-based access.",
                        "Built a 3-role system, designed more than 5 MySQL tables, and improved the user experience with dynamic JSP pages and Bootstrap-driven UI.",
                        "Java, JSP, JDBC, MySQL, Bootstrap, Sessions",
                        "",
                        "https://github.com/varadkachave",
                        "mint",
                        true,
                        2
                )
        ));
    }

    private void seedExperience() {
        if (experienceRepository.count() > 0) {
            return;
        }

        experienceRepository.saveAll(List.of(
                new Experience(
                        "Java Full Stack Web Development Intern",
                        "Main Flow Services and Technologies Pvt. Ltd.",
                        "Apr 2026",
                        "Pune",
                        "Completed an internship focused on Java full-stack web development, application architecture, and hands-on frontend and backend implementation.",
                        "Worked with Java, web technologies, and backend architecture concepts\nBuilt practical understanding of full-stack development and database interaction\nStrengthened problem solving, teamwork, communication, and coding discipline",
                        1
                ),
                new Experience(
                        "College Placement Coordinator",
                        "Indira College",
                        "Feb 2026",
                        "Pune",
                        "Supported campus placement activity by coordinating between students and recruiting companies during placement drives.",
                        "Assisted in organizing and executing campus placement drives\nManaged student coordination, communication, and scheduling\nBuilt confidence in responsibility, planning, and stakeholder communication",
                        2
                ),
                new Experience(
                        "Freelance Trek Leader",
                        "Freelance",
                        "2024 - 2026",
                        "Maharashtra",
                        "Led trekking groups in outdoor environments, focusing on coordination, safety, and on-the-spot decision making.",
                        "Successfully led more than 35 trekking expeditions\nManaged participant safety, coordination, and group communication\nDeveloped calm problem solving in demanding real-world situations",
                        3
                )
        ));
    }

    private void seedEducation() {
        if (educationRepository.count() > 0) {
            return;
        }

        educationRepository.saveAll(List.of(
                new Education(
                        "Indira College of Engineering and Management",
                        "Master of Computer Applications (MCA)",
                        "Expected Aug 2026",
                        "Pune",
                        "Focused on Java, web development, and database-oriented software engineering.",
                        1
                ),
                new Education(
                        "Indira College of Commerce and Science",
                        "Bachelor of Computer Applications (BCA)",
                        "Aug 2022 - May 2025",
                        "Pune",
                        "Built core computer application skills with exposure to software development, problem solving, and modern web technologies.",
                        2
                )
        ));
    }

    private void seedCertifications() {
        if (certificationRepository.count() > 0) {
            return;
        }

        certificationRepository.saveAll(List.of(
                new Certification("Cisco Certified Network Associate (CCNA)", 1),
                new Certification("Cybersecurity Analyst Simulation", 2),
                new Certification("AI Tools Workshop", 3),
                new Certification("Digital Productivity Certification", 4),
                new Certification("HackerRank SQL Certification (Basic and Intermediate)", 5)
        ));
    }
}
