import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["email", "password", "submit", "error"]

  static minPasswordLength = 6

  connect() {
    this.validateForm()
    this.setupEventListeners()
  }

  setupEventListeners() {
    this.emailTarget.addEventListener('input', this.validateForm.bind(this))
    this.passwordTarget.addEventListener('input', this.validateForm.bind(this))
  }

  validateForm() {
    const isEmailValid = this.validateEmail()
    const isPasswordValid = this.validatePassword()

    this.toggleValidationClass(this.emailTarget, isEmailValid)
    this.toggleValidationClass(this.passwordTarget, isPasswordValid)

    this.submitTarget.disabled = !(isEmailValid && isPasswordValid)
  }

  validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(this.emailTarget.value.trim())
  }

  validatePassword() {
    return this.passwordTarget.value.length >= this.constructor.minPasswordLength
  }

  toggleValidationClass(field, isValid) {
    if (field.value.length > 0) {
      field.classList.toggle("is-valid", isValid)
      field.classList.toggle("is-invalid", !isValid)
    } else {
      field.classList.remove("is-valid", "is-invalid")
    }
  }

  submitForm(event) {
    if (!(this.validateEmail() && this.validatePassword())) {
      event.preventDefault()
      this.showError("Please fill out all fields correctly.")
    } else {
      this.hideError()
    }
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
      this.emailTarget.classList.remove("is-valid", "is-invalid")
      this.passwordTarget.classList.remove("is-valid", "is-invalid")
      this.validateForm()
      this.hideError()
    }
  }
}
