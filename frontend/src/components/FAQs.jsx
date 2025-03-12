import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const navigate = useNavigate();

  const faqs = [
    {
        question: "How do I book an appointment with a specialist?",
        answer: "Select your preferred specialist from our verified doctors list, choose an available time slot that fits your schedule, and confirm your booking through our secure payment gateway."
      },
      {
        question: "What is your prescription renewal process?",
        answer: "Submit renewal requests through your patient portal. Our doctors will review your medical history and approve renewals within 24 hours for eligible prescriptions."
      },
      {
        question: "Can I get same-day appointments?",
        answer: "We offer limited same-day slots for urgent cases. Check availability in real-time through our mobile app or website."
      },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards, UPI payments, and net banking. Cash payments are also accepted at physical clinics."
    },
    {
      question: "How do I reschedule an appointment?",
      answer: "You can reschedule appointments through your dashboard up to 24 hours before your scheduled time."
    },
    {
        question: "How do I access my vaccination records?",
        answer: "All immunization records are securely stored in your digital health profile and can be downloaded as PDF anytime."
    },
    {
        question: "What safety measures are taken for in-person visits?",
        answer: "All partner clinics maintain strict hygiene protocols including equipment sterilization, air filtration systems, and mandatory staff vaccinations."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
       <h2 className="text-3xl font-semibold text-slate-800 text-center mb-12">
         Frequently Asked Questions
       </h2>

       <div className="space-y-4">
         {faqs.map((faq, index) => (
           <div 
            key={index}
            className="border border-slate-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <button
              className="w-full px-6 py-4 text-left flex justify-between items-center"
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
            >
              <span className="text-lg font-medium text-slate-700">
                {faq.question}
              </span>
              <svg
                className={`w-6 h-6 text-blue-600 transform transition-transform ${
                  activeIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            
            {activeIndex === index && (
              <div className="px-6 py-4 border-t border-slate-100">
                <p className="text-slate-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Corrected Contact Support button */}
      <div className="mt-12 text-center">
        <p className="text-slate-600 mb-4">
          Still have questions? Contact our support team
        </p>
        <button 
          onClick={() => navigate('/contact')} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition-colors"
        >
          Contact Support
        </button>
      </div>
    </div>
  );
};

export default FAQSection;