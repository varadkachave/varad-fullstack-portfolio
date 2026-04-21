package com.portfolio.website.controller;

import com.portfolio.website.dto.ContactForm;
import com.portfolio.website.service.PortfolioService;
import jakarta.validation.Valid;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.time.Year;

@Controller
public class PortfolioController {

    private final PortfolioService portfolioService;

    public PortfolioController(PortfolioService portfolioService) {
        this.portfolioService = portfolioService;
    }

    @GetMapping("/")
    public String home(Model model) {
        if (!model.containsAttribute("contactForm")) {
            model.addAttribute("contactForm", new ContactForm());
        }

        if (!model.containsAttribute("messageSent")) {
            model.addAttribute("messageSent", false);
        }

        populateHomePage(model);
        return "index";
    }

    @PostMapping("/contact")
    public String submitContact(
            @Valid @ModelAttribute("contactForm") ContactForm contactForm,
            BindingResult bindingResult,
            Model model,
            RedirectAttributes redirectAttributes
    ) {
        if (bindingResult.hasErrors()) {
            model.addAttribute("messageSent", false);
            populateHomePage(model);
            return "index";
        }

        portfolioService.saveContactMessage(contactForm);
        redirectAttributes.addFlashAttribute("messageSent", true);
        return "redirect:/";
    }

    @ModelAttribute("currentYear")
    public int currentYear() {
        return Year.now().getValue();
    }

    private void populateHomePage(Model model) {
        model.addAttribute("profile", portfolioService.getProfile());
        model.addAttribute("skillsByCategory", portfolioService.getSkillsByCategory());
        model.addAttribute("projects", portfolioService.getFeaturedProjects());
        model.addAttribute("experiences", portfolioService.getExperiences());
        model.addAttribute("educationHistory", portfolioService.getEducationHistory());
        model.addAttribute("certifications", portfolioService.getCertifications());
    }
}
