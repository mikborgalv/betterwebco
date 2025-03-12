// app/javascript/controllers/search_controller.js
import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  static targets = ["input", "results"];

  // FAQ Data (can be moved to a JSON file or backend API)
  static faqs = [
    {
      question: "Why is having a web presence important for my business?",
      answer: "A web presence helps you reach a global audience, build credibility, and attract new customers 24/7."
    },
    {
      question: "How can a website improve my ROI?",
      answer: "A well-designed website can generate leads, increase sales, and reduce marketing costs, providing a high return on investment."
    },
    {
      question: "What are the benefits of local business web development?",
      answer: "Local web development ensures your site is optimized for local SEO, helping you attract nearby customers and grow your community presence."
    },
    {
      question: "How does web management benefit my business?",
      answer: "Regular web management ensures your site is secure, up-to-date, and performing optimally, providing a seamless experience for your customers."
    }
  ];

  // Search functionality
  search() {
    const query = this.inputTarget.value.toLowerCase();
    const filteredFAQs = this.constructor.faqs.filter(faq =>
      faq.question.toLowerCase().includes(query)
    );

    this.displayResults(filteredFAQs);
  }

  // Display results
  displayResults(faqs) {
    if (faqs.length === 0) {
      this.resultsTarget.innerHTML = `<p class="text-light">No results found.</p>`;
      return;
    }

    const resultsHTML = faqs.map(faq => `
      <div class="card bg-gray-300 text-light border-light mb-3">
        <div class="card-body">
          <h6 class="card-title">${faq.question}</h6>
          <p class="card-text">${faq.answer}</p>
        </div>
      </div>
    `).join("");

    this.resultsTarget.innerHTML = resultsHTML;
  }
}