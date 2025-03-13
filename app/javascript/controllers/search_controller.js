// app/javascript/controllers/search_controller.js
import { Controller } from "@hotwired/stimulus"
// import { debounce } from "lodash";


export default class extends Controller {
  static targets = ["input", "results"];

  // FAQ Data (fetched from JSON file)
  faqs = [];

  // Connect lifecycle method
  connect() {
    // this.search = debounce(this.search.bind(this), 300);
    this.fetchFAQs();
    this.setupEventListeners();
  }

  // Fetch FAQs from the JSON file
  async fetchFAQs() {
    try {
      const response = await fetch("/faqs.json"); // Path to your JSON file
      this.faqs = await response.json();
    } catch (error) {
      console.error("Failed to fetch FAQs:", error);
      this.resultsTarget.innerHTML = `<p class="text-light">Failed to load FAQs. Please try again later.</p>`;
    }
  }

// app/javascript/controllers/search_controller.js
displayResults(faqs, query) {
  if (faqs.length === 0) {
    this.resultsTarget.innerHTML = `<p class="text-light">No results found.</p>`;
    return;
  }

  // Limit results to 3
  const limitedFAQs = faqs.slice(0, 3);

  // Use let instead of const
  let resultsHTML = limitedFAQs.map(faq => `
    <div class="card bg-dark text-light border-light mb-3">
      <div class="card-body">
        <h6 class="card-title">${this.highlightMatches(faq.question, query)}</h6>
        <p class="card-text">${this.highlightMatches(faq.answer, query)}</p>
      </div>
    </div>
  `).join("");

  // Add "View More" button if there are more than 3 results
  if (faqs.length > 3) {
    resultsHTML += `
      <button class="btn btn-outline-light w-100" data-action="click->search#showAllResults">
        View More (${faqs.length - 3} more)
      </button>
    `;
  }

  this.resultsTarget.innerHTML = resultsHTML;
}

// Show all results
showAllResults() {
  const query = this.inputTarget.value.toLowerCase();
  const filteredFAQs = this.faqs.filter(faq =>
    faq.question.toLowerCase().includes(query) || faq.answer.toLowerCase().includes(query)
  );

  const resultsHTML = filteredFAQs.map(faq => `
    <div class="card bg-dark text-light border-light mb-3">
      <div class="card-body">
        <h6 class="card-title">${this.highlightMatches(faq.question, query)}</h6>
        <p class="card-text">${this.highlightMatches(faq.answer, query)}</p>
      </div>
    </div>
  `).join("");

  this.resultsTarget.innerHTML = resultsHTML;
}
  // Auto-clear results when input loses focus
  clearResults() {
    setTimeout(() => {
      if (!this.inputTarget.matches(":focus")) {
        this.resultsTarget.innerHTML = "";
      }
    }, 200); // Small delay to allow click events on results
  }

  // Setup event listeners
  setupEventListeners() {
    this.inputTarget.addEventListener("focusout", () => this.clearResults());
  }
}