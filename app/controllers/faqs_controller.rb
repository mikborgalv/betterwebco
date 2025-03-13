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
        },
          {
            question: "What services does Betterwebco offer?",
            answer: "Betterwebco provides full-stack development services, including website design, front-end and back-end development, database management, and web app development."
          },
          {
            question: "Do you work with startups and small businesses?",
            answer: "Yes! We specialize in helping startups and small businesses build their online presence with affordable, scalable solutions."
          },
          {
            question: "How much does it cost to build a website with Betterwebco?",
            answer: "Each project is unique, and pricing depends on the complexity, features, and client needs. We also offer a donation-based option to help small businesses and individuals establish a web presence."
          },
          {
            question: "What technologies do you use?",
            answer: "We primarily use Ruby on Rails, Bootstrap for styling, SQLite3 for databases, and Stimulus for interactivity. However, we can work with other modern technologies based on project requirements."
          },
          {
            question: "Do you offer e-commerce website development?",
            answer: "Yes, we can build e-commerce platforms with secure payment integration, inventory management, and user-friendly interfaces."
          },
          {
            question: "How long does it take to complete a project?",
            answer: "Timelines vary based on project scope. A simple website may take a few weeks, while a complex web application could take several months."
          },
          {
            question: "Do you provide website maintenance and support?",
            answer: "Yes! We offer ongoing support and maintenance services to ensure your website runs smoothly."
          },
          {
            question: "Can you redesign an existing website?",
            answer: "Absolutely! We can revamp outdated websites with modern designs, improved performance, and better user experiences."
          },
          {
            question: "Do you offer SEO services?",
            answer: "Yes, we implement SEO best practices to improve your website’s visibility on search engines."
          },
          {
            question: "Will my website be mobile-friendly?",
            answer: "Yes, all websites we build are fully responsive and optimized for mobile devices."
          },
          {
            question: "Can I update my website on my own?",
            answer: "We can build websites with content management systems (CMS) so you can easily update content without coding knowledge."
          },
          {
            question: "What payment methods do you accept?",
            answer: "We accept multiple payment methods, and for qualifying individuals or businesses, we also offer a donation-based model to support web development needs."
          },
          {
            question: "Do you offer custom web applications?",
            answer: "Yes! We build tailored web applications based on your specific business needs."
          },
          {
            question: "How do I get started with Betterwebco?",
            answer: "Simply contact us with your project details, and we’ll set up a consultation to discuss your goals and requirements."
          },
          {
            question: "Why should I choose Betterwebco over other developers?",
            answer: "We offer personalized, high-quality web development with flexible pricing options, including donation-based support for those in need. Our goal is to help businesses and individuals establish a strong online presence without financial barriers."
          }
        
      ]
      render json: faqs
    end
  end