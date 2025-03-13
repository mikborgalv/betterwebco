// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"

import * as bootstrap from "bootstrap"
// app/javascript/packs/application.js
// app/javascript/packs/application.js
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Hero section animations
document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed");


    const cards = document.querySelectorAll(".card");
    const heroSection = document.querySelector(".hero-section");


    if (heroSection) {
      console.log("Hero section found:", heroSection);
  
      gsap.from(heroSection.querySelector("h1"), {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 0.5,
        ease: "power2.out",
        onStart: () => console.log("Animating h1"),
      });
  
      gsap.from(heroSection.querySelector("p"), {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 1,
        ease: "power2.out",
        onStart: () => console.log("Animating p"),
      });
  
      gsap.from(heroSection.querySelectorAll(".btn"), {
        opacity: 0,
        y: 50,
        duration: 1,
        delay: 1.5,
        ease: "power2.out",
        stagger: 0.2,
        onStart: () => console.log("Animating buttons"),
      });
    } else {
      console.log("Hero section not found");
    }


    const nameField = document.querySelector("input[name='customer[name]']");

    if (nameField) {
      // Remove Inputmask if it's causing the issue
      if (nameField.inputmask) {
        nameField.inputmask.remove(); // Remove the mask
      }
  
      // Reapply Inputmask with correct configuration (if needed)
      Inputmask({
        regex: "^[A-Za-z]+( [A-Za-z]+)*$", // Allows only letters and spaces
        placeholder: "Joe Doe", // Placeholder for the name field
      }).mask(nameField);
    }


  
    const servicesSection = document.querySelector("#services");
    if (servicesSection) {
      console.log("Services section found:", servicesSection);
  
      const cards = servicesSection.querySelectorAll(".card");
      console.log("Number of cards found:", cards.length);
  
      gsap.from(cards, {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.3,
        scrollTrigger: {
          trigger: servicesSection,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        onComplete: () => {
          console.log("Cards animation complete");
          gsap.set(cards, { clearProps: "all" });
        },
      });
    } else {
      console.log("Services section not found");
    }
  });