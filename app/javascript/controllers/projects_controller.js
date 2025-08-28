import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  add() {
    const projectName = prompt("Enter project name:")
    if (projectName) {
      const list = document.querySelector("#projects-list ul")
      if (list) {
        const item = document.createElement("li")
        item.className = "list-group-item bg-dark text-light"
        item.textContent = projectName
        list.appendChild(item)
      }
    }
  }
}

