import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["email", "password", "passwordConfirmation", "submit", "error"]
  
  // Password validation constants
  static minPasswordLength = 6

  connect() {
    this.validateForm()
    this.setupEventListeners()
  }

  setupEventListeners() {
    // Validate on input for all fields
    this.emailTarget.addEventListener('input', this.validateForm.bind(this))
    this.passwordTarget.addEventListener('input', this.validateForm.bind(this))
    this.passwordConfirmationTarget.addEventListener('input', this.validateForm.bind(this))
  }

  validateForm() {
    const isEmailValid = this.validateEmail()
    const isPasswordValid = this.validatePassword()
    const isPasswordConfirmationValid = this.validatePasswordConfirmation()

    this.toggleValidationClass(this.emailTarget, isEmailValid)
    this.toggleValidationClass(this.passwordTarget, isPasswordValid)
    this.toggleValidationClass(this.passwordConfirmationTarget, isPasswordConfirmationValid)

    this.submitTarget.disabled = !(isEmailValid && isPasswordValid && isPasswordConfirmationValid)
  }

  validateEmail() {
    // Standard email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(this.emailTarget.value.trim())
  }

  validatePassword() {
    // Basic password validation - you can enhance this with more rules
    return this.passwordTarget.value.length >= this.constructor.minPasswordLength
  }

  validatePasswordConfirmation() {
    // Check if password confirmation matches password
    return this.passwordTarget.value === this.passwordConfirmationTarget.value && 
           this.passwordTarget.value.length > 0
  }

  toggleValidationClass(field, isValid) {
    // Only toggle classes if the field has been interacted with
    if (field.value.length > 0) {
      field.classList.toggle("is-valid", isValid)
      field.classList.toggle("is-invalid", !isValid)
    } else {
      // Remove both classes if field is empty
      field.classList.remove("is-valid", "is-invalid")
    }
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
    return (
      this.validateEmail() && 
      this.validatePassword() && 
      this.validatePasswordConfirmation()
    )
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
      
      // Reset validation classes
      this.emailTarget.classList.remove("is-valid", "is-invalid")
      this.passwordTarget.classList.remove("is-valid", "is-invalid")
      this.passwordConfirmationTarget.classList.remove("is-valid", "is-invalid")
      
      this.validateForm()
      this.hideError()
    }
  }
}