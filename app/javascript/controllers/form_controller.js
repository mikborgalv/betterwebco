// app/javascript/controllers/form_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["name", "email", "message", "submit", "error"]

  connect() {
    this.validateForm()
  }

  validateForm() {
    const isNameValid = this.nameTarget.value.trim().length >= 2
    const isEmailValid = this.validateEmail(this.emailTarget.value)
    const isMessageValid = this.messageTarget.value.trim().length >= 10

    this.nameTarget.classList.toggle("is-invalid", !isNameValid)
    this.emailTarget.classList.toggle("is-invalid", !isEmailValid)
    this.messageTarget.classList.toggle("is-invalid", !isMessageValid)

    this.submitTarget.disabled = !(isNameValid && isEmailValid && isMessageValid)
  }

  validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  submitForm(event) {
    if (!this.isFormValid()) {
      event.preventDefault()
      this.showError("Please fill out all fields correctly.")
    } else {
      this.hideError()
    }
  }

  isFormValid() {
    const isNameValid = this.nameTarget.value.trim().length >= 2
    const isEmailValid = this.validateEmail(this.emailTarget.value)
    const isMessageValid = this.messageTarget.value.trim().length >= 10
    return isNameValid && isEmailValid && isMessageValid
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