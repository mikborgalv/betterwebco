import { Controller } from "@hotwired/stimulus"
import { gsap } from "gsap"

export default class extends Controller {
  static targets = ["hero", "cards"]

  connect() {
    this.animateHero()
    this.animateCards()
  }

  animateHero() {
    gsap.from(this.heroTarget, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power2.out",
    })
  }

  animateCards() {
    gsap.from(this.cardsTarget.children, {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 1,
      ease: "power2.out",
      delay: 1, // Delay to animate after the hero section
    })
  }
}
