// app/javascript/controllers/search_controller.js
import { Controller } from "@hotwired/stimulus"
// app/javascript/controllers/search_controller.js

export default class extends Controller {
  static targets = ["input", "results"];

  // FAQ Data (can be moved to a JSON file or backend API)
  faqs = [];

  // Connect lifecycle method
  connect() {
    this.fetchFAQs();
  }

  // Fetch FAQs from the backend
  async fetchFAQs() {
    try {
      const response = await fetch("/faqs.json"); // Replace with your backend endpoint
      this.faqs = await response.json();
    } catch (error) {
      console.error("Failed to fetch FAQs:", error);
      this.resultsTarget.innerHTML = `<p class="text-light">Failed to load FAQs. Please try again later.</p>`;
    }
  }

  // Search functionality
  search() {
    const query = this.inputTarget.value.toLowerCase();
    const filteredFAQs = this.faqs.filter(faq =>
      faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query)
    );

    this.displayResults(filteredFAQs, query);
  }

  // Display results
  displayResults(faqs, query) {
    if (faqs.length === 0) {
      this.resultsTarget.innerHTML = `<p class="text-light">No results found.</p>`;
      return;
    }

    const resultsHTML = faqs.map(faq => `
      <div class="card bg-dark text-light border-light mb-3">
        <div class="card-body">
          <h6 class="card-title">${this.highlightMatches(faq.question, query)}</h6>
          <p class="card-text">${this.highlightMatches(faq.answer, query)}</p>
        </div>
      </div>
    `).join("");

    this.resultsTarget.innerHTML = resultsHTML;
  }

  // Highlight matches in text
  highlightMatches(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, "gi");
    return text.replace(regex, '<span class="highlight">$1</span>');
  }
  // Clear results when the input loses focus
  clearResults() {
    setTimeout(() => {
      if (!this.inputTarget.matches(":focus")) {
        this.resultsTarget.innerHTML = "";
        this.inputTarget.value = "";
      }
    }, 200); // Small delay to allow click events on results
  }
}