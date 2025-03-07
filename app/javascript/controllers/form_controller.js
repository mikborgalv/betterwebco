// app/javascript/controllers/form_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["name", "message", "submit", "error"]

  connect() {
    this.validateForm()
  }

  validateForm() {
    const isNameValid = this.nameTarget.value.trim().length >= 2
    const isMessageValid = this.messageTarget.value.trim().length >= 10

    this.nameTarget.classList.toggle("is-invalid", !isNameValid)
    this.messageTarget.classList.toggle("is-invalid", !isMessageValid)

    this.submitTarget.disabled = !(isNameValid && isMessageValid)
  }

  submitForm(event) {
    // Prevent the form from submitting if validation fails
    if (!this.isFormValid()) {
      event.preventDefault() // Stop the form submission
      this.showError("Please fill out all fields correctly.")
    } else {
      this.hideError()
    }
  }

  isFormValid() {
    const isNameValid = this.nameTarget.value.trim().length >= 2
    const isMessageValid = this.messageTarget.value.trim().length >= 10
    return isNameValid && isMessageValid
  }

  showError(message) {
    this.errorTarget.textContent = message
    this.errorTarget.classList.remove("d-none")
  }

  hideError() {
    this.errorTarget.textContent = ""
    this.errorTarget.classList.add("d-none")
  }

  clearForm(event) {
    if (event.detail.success) {
      this.element.reset()
      this.validateForm()
      this.hideError()
    }
  }
}