// // app/javascript/controllers/form_controller.js
import { Controller } from "@hotwired/stimulus"


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
      placeholder: "", // Placeholder for the name field
    }).mask(this.nameTarget)

    // Initialize Inputmask for the email field
    new Inputmask({
      // alias: "email", // Built-in email mask
      placeholder: "Your@email.com", // Placeholder for the email field
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

  validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.emailTarget.value)) {
      this.emailTarget.classList.add("is-invalid");
    } else {
      this.emailTarget.classList.remove("is-invalid");
    }
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


// app/javascript/controllers/form_controller.js
// import { Controller } from "@hotwired/stimulus"

// export default class extends Controller {
//   static targets = ["name", "email", "message", "submit", "error"]
  
//   // Minimum message length
//   static minMessageLength = 10

//   connect() {
//     this.validateForm()
//     this.setupEventListeners()
//   }

//   setupEventListeners() {
//     // Validate on input for all fields
//     this.nameTarget.addEventListener('input', this.validateForm.bind(this))
//     this.emailTarget.addEventListener('input', this.validateForm.bind(this))
//     this.messageTarget.addEventListener('input', this.validateForm.bind(this))
//   }

//   validateForm() {
//     const isNameValid = this.validateName()
//     const isEmailValid = this.validateEmail()
//     const isMessageValid = this.validateMessage()

//     this.toggleValidationClass(this.nameTarget, isNameValid)
//     this.toggleValidationClass(this.emailTarget, isEmailValid)
//     this.toggleValidationClass(this.messageTarget, isMessageValid)

//     this.submitTarget.disabled = !(isNameValid && isEmailValid && isMessageValid)
//   }

//   validateName() {
//     // Basic name validation - at least 2 words with only letters and spaces
//     const nameRegex = /^[A-Za-z]+( [A-Za-z]+)+$/
//     return nameRegex.test(this.nameTarget.value.trim())
//   }

//   validateEmail() {
//     // Standard email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
//     return emailRegex.test(this.emailTarget.value.trim())
//   }

//   validateMessage() {
//     // Minimum length validation
//     return this.messageTarget.value.trim().length >= this.constructor.minMessageLength
//   }

//   toggleValidationClass(field, isValid) {
//     field.classList.toggle("is-valid", isValid)
//     field.classList.toggle("is-invalid", !isValid)
//   }

//   submitForm(event) {
//     if (!this.isFormValid()) {
//       event.preventDefault()
//       this.showError("Please fill out all fields correctly.")
//     } else {
//       this.hideError()
//     }
//   }

//   isFormValid() {
//     return (
//       this.validateName() && 
//       this.validateEmail() && 
//       this.validateMessage()
//     )
//   }

//   showError(message) {
//     this.errorTarget.textContent = message
//     this.errorTarget.classList.remove("d-none")
//   }

//   hideError() {
//     this.errorTarget.textContent = ""
//     this.errorTarget.classList.add("d-none")
//   }

//   clearForm(event) {
//     if (event.detail.success) {
//       this.element.reset()
//       this.validateForm()
//       this.hideError()
//     }
//   }
// }