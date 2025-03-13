# app/controllers/faqs_controller.rb
class FaqsController < ApplicationController
    def index
      faqs = [
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
      ]
      render json: faqs
    end
  end