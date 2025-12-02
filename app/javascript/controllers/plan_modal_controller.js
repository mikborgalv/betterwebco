import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="plan-modal"
export default class extends Controller {
  static targets = ["modal"]

  connect() {
    // Show modal automatically if data attribute says so
    if (this.hasModalTarget && this.modalTarget.dataset.show === "true") {
      let modal = new bootstrap.Modal(this.modalTarget)
      modal.show()
    }
  }
}
