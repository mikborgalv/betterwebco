// app/javascript/controllers/accordion_animations_controller.js
import { Controller } from "@hotwired/stimulus";
import { gsap } from "gsap";

export default class extends Controller {
  connect() {
    this.setupAnimations();
  }

  setupAnimations() {
    const accordionItems = this.element.querySelectorAll(".accordion-item");

    accordionItems.forEach((item) => {
      const button = item.querySelector(".accordion-button");
      const body = item.querySelector(".accordion-collapse");

      button.addEventListener("click", () => {
        if (body.classList.contains("show")) {
          gsap.from(body, {
            height: 0,
            duration: 0.3,
            ease: "power2.inOut",
          });
        } else {
          gsap.to(body, {
            height: 0,
            duration: 0.3,
            ease: "power2.inOut",
          });
        }
      });
    });
  }
}
