import React, { useState } from 'react'

const SymptomGuide = () => {
  const [activeIndex, setActiveIndex] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const symptoms = [
    {
      title: "Headache & Migraine",
      reasons: ["Dehydration", "Stress", "Sleep deprivation", "Eye strain", "Sinus congestion"],
      solutions: ["Hydrate with water/electrolytes", "Practice deep breathing exercises", "Maintain consistent sleep schedule", "20-20-20 screen rule", "Cold compress on forehead"],
      warning: "Seek help if accompanied by vision loss or confusion",
      color: "border-red-500"
    },
    {
      title: "Respiratory Issues",
      reasons: ["Common cold", "Allergies", "Asthma", "COVID-19", "Pneumonia"],
      solutions: ["Steam inhalation", "Antihistamines", "Inhaler use", "Chest physiotherapy", "Humidifier"],
      warning: "Emergency if lips turn blue or breathing difficulty",
      color: "border-cyan-500"
    },
    {
      title: "Gastrointestinal Problems",
      reasons: ["Food poisoning", "IBS", "Acid reflux", "Viral gastroenteritis", "Lactose intolerance"],
      solutions: ["BRAT diet", "Probiotics", "Antacids", "Hydration", "Avoid dairy/fatty foods"],
      warning: "Seek help for blood in stool or persistent vomiting",
      color: "border-emerald-500"
    },
    {
      title: "Musculoskeletal Pain",
      reasons: ["Poor posture", "Overuse injury", "Arthritis", "Fibromyalgia", "Osteoporosis"],
      solutions: ["RICE method", "Gentle stretching", "OTC pain relievers", "Ergonomic adjustments", "Physical therapy"],
      warning: "Immediate care needed for sudden severe pain/swelling",
      color: "border-amber-600"
    },
    {
      title: "Mental Health Symptoms",
      reasons: ["Chronic stress", "Anxiety disorder", "Depression", "Burnout", "Sleep disorders"],
      solutions: ["Mindfulness meditation", "Professional counseling", "Regular exercise", "Social connection", "Sleep hygiene"],
      warning: "Urgent care if suicidal thoughts occur",
      color: "border-purple-500"
    },
    {
      title: "Skin Conditions",
      reasons: ["Allergic reaction", "Eczema", "Psoriasis", "Fungal infection", "Contact dermatitis"],
      solutions: ["Cold compress", "Antihistamines", "Moisturize regularly", "OTC hydrocortisone", "Avoid irritants"],
      warning: "Emergency for spreading rash or facial swelling",
      color: "border-pink-500"
    }
  ]

  const filteredSymptoms = symptoms.filter(symptom =>
    symptom.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Comprehensive Symptom Guide 🩺
          </h1>
          <p className="text-gray-600 mb-6">
            Understand your symptoms and discover evidence-based management strategies
          </p>
          
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="🔍 Search symptoms..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        <section className="mb-12 bg-white rounded-xl p-6 shadow-lg animate-slide-up">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">⚠️ Emergency Warning Signs</h2>
          <div className="grid md:grid-cols-2 gap-4 text-red-700">
            <div className="p-3 bg-red-50 rounded-lg flex items-center">
              <span className="mr-2">🚨</span> Chest pain lasting more than 5 minutes
            </div>
            <div className="p-3 bg-red-50 rounded-lg flex items-center">
              <span className="mr-2">🚨</span> Sudden difficulty speaking or confusion
            </div>
            <div className="p-3 bg-red-50 rounded-lg flex items-center">
              <span className="mr-2">🚨</span> Uncontrolled bleeding
            </div>
            <div className="p-3 bg-red-50 rounded-lg flex items-center">
              <span className="mr-2">🚨</span> Shortness of breath at rest
            </div>
          </div>
        </section>

        <div className="space-y-6">
          {filteredSymptoms.map((symptom, index) => (
            <div 
              key={index}
              className={`bg-white rounded-xl shadow-lg transition-all duration-300 ease-out ${
                activeIndex === index ? 'ring-2 ring-blue-200' : ''
              }`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full px-6 py-5 flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-10 rounded-full ${symptom.color}`} />
                  <div className="text-left">
                    <h2 className="text-xl font-semibold text-gray-800">{symptom.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">{symptom.warning}</p>
                  </div>
                </div>
                <span className={`text-gray-500 transform transition-transform duration-300 ${
                  activeIndex === index ? 'rotate-180' : ''
                }`}>
                  ▼
                </span>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ease-in-out ${
                activeIndex === index ? 'max-h-[800px]' : 'max-h-0'
              }`}>
                <div className="px-6 py-5 border-t border-gray-100">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-sm font-semibold text-red-600 uppercase mb-3 flex items-center">
                        <span className="mr-2">📌</span> Potential Causes
                      </h3>
                      <ul className="space-y-3">
                        {symptom.reasons.map((reason, i) => (
                          <li key={i} className="flex items-start text-gray-700">
                            <span className="text-gray-500 mr-2">•</span>
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-semibold text-green-600 uppercase mb-3 flex items-center">
                        <span className="mr-2">💡</span> Management Strategies
                      </h3>
                      <ul className="space-y-3">
                        {symptom.solutions.map((solution, i) => (
                          <li key={i} className="flex items-start text-gray-700">
                            <span className="text-gray-500 mr-2">•</span>
                            {solution}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                    <h4 className="text-sm font-semibold text-yellow-700 flex items-center mb-2">
                      ⚠️ When to See a Doctor
                    </h4>
                    <p className="text-yellow-700">{symptom.warning}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-12 bg-white rounded-xl p-8 shadow-lg animate-slide-up">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🌿 General Prevention Tips</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold mb-2">💧 Hydration</h3>
              <p className="text-sm">Aim for 8-10 glasses of water daily</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-2">🏃 Exercise</h3>
              <p className="text-sm">150 minutes moderate activity weekly</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold mb-2">🛌 Sleep</h3>
              <p className="text-sm">7-9 hours quality sleep nightly</p>
            </div>
          </div>
        </section>

        <footer className="mt-8 p-6 bg-red-50 rounded-xl text-center animate-fade-in">
          <p className="text-red-700 font-medium">
            🚑 This guide is not a substitute for professional medical advice. 
            Always consult a healthcare provider for proper diagnosis and treatment.
          </p>
        </footer>
      </div>
    </div>
  )
}

export default SymptomGuide


