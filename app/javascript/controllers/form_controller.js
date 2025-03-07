// app/javascript/controllers/form_controller.js
import { Controller } from "@hotwired/stimulus"
import Inputmask from "inputmask" // Correct import statement

export default class extends Controller {
  static targets = ["name", "email", "message", "submit", "error"]

  connect() {
    this.initializeMasks()
    this.validateForm()
  }

  initializeMasks() {
    // Initialize Inputmask for the name field
    new Inputmask({
      regex: "^[A-Za-z]+( [A-Za-z]+)*$", // Allows only letters and spaces
      placeholder: "Joe Doe", // Placeholder for the name field
    }).mask(this.nameTarget)

    // Initialize Inputmask for the email field
    new Inputmask({
      alias: "email", // Built-in email mask
      placeholder: "joe@example.com", // Placeholder for the email field
    }).mask(this.emailTarget)

    // Placeholder for message (no strict mask)
    this.messageTarget.placeholder = "Enter your message here (at least 10 characters)..."
  }

  validateForm() {
    const isNameValid = this.nameTarget.inputmask.isComplete()
    const isEmailValid = this.emailTarget.inputmask.isComplete()
    const isMessageValid = this.messageTarget.value.trim().length >= 10

    this.toggleValidationClass(this.nameTarget, isNameValid)
    this.toggleValidationClass(this.emailTarget, isEmailValid)
    this.toggleValidationClass(this.messageTarget, isMessageValid)

    this.submitTarget.disabled = !(isNameValid && isEmailValid && isMessageValid)
  }

  validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  toggleValidationClass(field, isValid) {
    field.classList.toggle("is-valid", isValid)
    field.classList.toggle("is-invalid", !isValid)
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
    const isNameValid = this.nameTarget.inputmask.isComplete()
    const isEmailValid = this.emailTarget.inputmask.isComplete()
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