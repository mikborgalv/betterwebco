// app/javascript/controllers/plan_select_controller.js
import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static values = {
    endpoint: String // e.g., "/users/plans"
  }

  static targets = ["button"]

  subscribe(event) {
    event.preventDefault()
    const btn = event.currentTarget
    const planId = btn.dataset.planId

    this.toggleLoading(btn, true)

    fetch(this.endpointValue, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": this.csrfToken()
      },
      body: JSON.stringify({ plan_id: planId })
    })
    .catch(() => { /* network errors */ })
    .finally(() => this.toggleLoading(btn, false))
  }

  switch(event) {
    event.preventDefault()
    const btn = event.currentTarget
    const planId = btn.dataset.planId
    const accountPath = btn.dataset.accountPath // e.g., /users/plans/:id

    this.toggleLoading(btn, true)

    fetch(accountPath, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": this.csrfToken()
      },
      body: JSON.stringify({ plan_id: planId })
    })
    .catch(() => {})
    .finally(() => this.toggleLoading(btn, false))
  }

  csrfToken() {
    const meta = document.querySelector("meta[name='csrf-token']")
    return meta && meta.content
  }

  toggleLoading(btn, on) {
    if (!btn) return
    btn.disabled = on
    if (on) {
      btn.dataset.originalText = btn.innerText
      btn.innerText = "Processing…"
    } else if (btn.dataset.originalText) {
      btn.innerText = btn.dataset.originalText
    }
  }
}
