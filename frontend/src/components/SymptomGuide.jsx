import React, { useState } from 'react'

const SymptomGuide = () => {
  const [activeIndex, setActiveIndex] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const symptoms = [
    {
      title: "Headache & Migraine",
      reasons: ["Dehydration", "Stress", "Sleep deprivation", "Eye strain", "Sinus congestion"],
      solutions: ["Drink plenty of water or oral rehydration solutions", "Practice deep breathing and relaxation techniques", "Maintain a consistent sleep schedule", "Follow the 20-20-20 rule for screen time", "Apply a cold compress to the forehead"],
      warning: "If accompanied by confusion or visual disturbances, seek urgent care",
      color: "border-red-500"
    },
    {
      title: "Respiratory Issues",
      reasons: ["Common cold", "Allergies", "Asthma", "COVID-19", "Pneumonia"],
      solutions: ["Inhale steam to relieve congestion", "Take antihistamines as advised", "Use prescribed inhalers", "Perform chest physiotherapy", "Use a humidifier to ease breathing"],
      warning: "If you experience difficulty breathing or bluish lips, consult a doctor immediately",
      color: "border-cyan-500"
    },
    {
      title: "Gastrointestinal Problems",
      reasons: ["Food poisoning", "IBS", "Acid reflux", "Viral gastroenteritis", "Lactose intolerance"],
      solutions: ["Follow the BRAT diet (Banana, Rice, Applesauce, Toast)", "Take probiotics", "Use antacids for relief", "Stay hydrated", "Avoid trigger foods like dairy and fried items"],
      warning: "Seek immediate care for blood in stool or unrelenting vomiting",
      color: "border-emerald-500"
    },
    {
      title: "Musculoskeletal Pain",
      reasons: ["Poor posture", "Overuse injury", "Arthritis", "Fibromyalgia", "Osteoporosis"],
      solutions: ["Follow the RICE method (Rest, Ice, Compression, Elevation)", "Do light stretching", "Take over-the-counter pain relievers", "Adjust your workspace ergonomically", "Consult a physiotherapist"],
      warning: "Sudden intense pain or swelling needs urgent attention",
      color: "border-amber-600"
    },
    {
      title: "Mental Health Symptoms",
      reasons: ["Chronic stress", "Anxiety disorder", "Depression", "Burnout", "Sleep disorders"],
      solutions: ["Try mindfulness and meditation", "Seek professional counseling", "Engage in regular physical activity", "Build a strong social network", "Maintain good sleep hygiene"],
      warning: "If experiencing suicidal thoughts, seek professional help immediately",
      color: "border-purple-500"
    },
    {
      title: "Skin Conditions",
      reasons: ["Allergic reaction", "Eczema", "Psoriasis", "Fungal infection", "Contact dermatitis"],
      solutions: ["Apply a cold compress", "Use antihistamines", "Keep skin moisturized", "Apply OTC hydrocortisone cream", "Avoid known irritants"],
      warning: "See a doctor if rash spreads rapidly or involves the face",
      color: "border-pink-500"
    },
    {
      title: "Eye Discomfort",
      reasons: ["Dry eyes", "Conjunctivitis", "Eye strain", "Allergies", "Infections"],
      solutions: ["Use lubricating eye drops", "Practice eye hygiene", "Limit screen time", "Apply a cool compress", "Consult an eye specialist"],
      warning: "Seek care if you experience blurred vision or eye pain",
      color: "border-blue-500"
    },
    {
      title: "Fatigue & Low Energy",
      reasons: ["Anemia", "Poor sleep", "Thyroid imbalance", "Chronic stress", "Nutritional deficiency"],
      solutions: ["Ensure iron and B12 intake", "Get adequate rest", "Manage stress levels", "Include balanced meals", "Consult your doctor for blood tests"],
      warning: "Persistent fatigue should be evaluated by a medical professional",
      color: "border-yellow-500"
    }
  ]

  const filteredSymptoms = symptoms.filter(symptom =>
    symptom.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Your Symptom Navigator 🩺
          </h1>
          <p className="text-gray-600 mb-6">
            Learn common causes, remedies, and warning signs for various health symptoms
          </p>
          <div className="max-w-md mx-auto relative">
            <input
              type="text"
              placeholder="🔍 Search symptoms..."
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        <section className="mb-12 bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🚨 Emergency Indicators</h2>
          <div className="grid md:grid-cols-2 gap-4 text-red-700">
            <div className="p-3 bg-red-50 rounded-lg flex items-center">⚠️ Chest pain over 5 minutes</div>
            <div className="p-3 bg-red-50 rounded-lg flex items-center">⚠️ Confusion or slurred speech</div>
            <div className="p-3 bg-red-50 rounded-lg flex items-center">⚠️ Bleeding that won’t stop</div>
            <div className="p-3 bg-red-50 rounded-lg flex items-center">⚠️ Difficulty breathing at rest</div>
          </div>
        </section>

        <div className="space-y-6">
          {filteredSymptoms.map((symptom, index) => (
            <div 
              key={index}
              className={`bg-white rounded-xl shadow-lg transition-all duration-300 ${activeIndex === index ? 'ring-2 ring-blue-200' : ''}`}
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full px-6 py-5 flex justify-between items-center hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-10 rounded-full ${symptom.color}`} />
                  <div className="text-left">
                    <h2 className="text-xl font-semibold text-gray-800">{symptom.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">{symptom.warning}</p>
                  </div>
                </div>
                <span className={`text-gray-500 transform transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}>
                  ▼
                </span>
              </button>

              <div className={`overflow-hidden transition-all duration-300 ${activeIndex === index ? 'max-h-[800px]' : 'max-h-0'}`}>
                <div className="px-6 py-5 border-t border-gray-100">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="text-sm font-semibold text-red-600 uppercase mb-3">📌 Causes</h3>
                      <ul className="space-y-3">
                        {symptom.reasons.map((reason, i) => (
                          <li key={i} className="flex items-start text-gray-700">
                            <span className="text-gray-500 mr-2">•</span>{reason}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-green-600 uppercase mb-3">💡 Solutions</h3>
                      <ul className="space-y-3">
                        {symptom.solutions.map((solution, i) => (
                          <li key={i} className="flex items-start text-gray-700">
                            <span className="text-gray-500 mr-2">•</span>{solution}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                    <h4 className="text-sm font-semibold text-yellow-700 mb-2">⚠️ When to Visit a Doctor</h4>
                    <p className="text-yellow-700">{symptom.warning}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-12 bg-white rounded-xl p-8 shadow-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🌿 Prevention Tips</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold mb-2">💧 Stay Hydrated</h3>
              <p className="text-sm">Drink 8–10 glasses of water each day</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-2">🏃 Regular Exercise</h3>
              <p className="text-sm">Aim for 150 minutes of physical activity weekly</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold mb-2">🛌 Quality Sleep</h3>
              <p className="text-sm">Get 7–9 hours of sleep every night</p>
            </div>
          </div>
        </section>

        <footer className="mt-8 p-6 bg-red-50 rounded-xl text-center">
          <p className="text-red-700 font-medium">
            📌 This guide is for informational purposes only. For any medical concerns, please consult a certified healthcare provider.
          </p>
        </footer>
      </div>
    </div>
  )
}

export default SymptomGuide