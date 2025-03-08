import React from 'react';
import { GiDoctorFace, GiCalendar, GiHealthNormal, GiNotebook, GiShield } from 'react-icons/gi';

const Benefits = () => {
  return (
    <div className="py-16 px-6 sm:px-12 lg:px-24 bg-blue-50">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
          Why Choose MedWell?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                <GiDoctorFace className="text-3xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Verified Specialists</h3>
                <p className="text-gray-600">
                  Access 2000+ certified doctors with transparent qualifications and experience
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                <GiCalendar className="text-3xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Flexible Scheduling</h3>
                <p className="text-gray-600">
                  Book same-day appointments or plan ahead with our easy calendar system
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                <GiHealthNormal className="text-3xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Comprehensive Care</h3>
                <p className="text-gray-600">
                  From routine checkups to specialized treatments - all in one platform
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                <GiNotebook className="text-3xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Digital Records</h3>
                <p className="text-gray-600">
                  Secure access to prescriptions, test results, and medical history
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                <GiShield className="text-3xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Priority Safety</h3>
                <p className="text-gray-600">
                  Stringent hygiene protocols and infection control measures at all partner clinics
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                <GiCalendar className="text-3xl" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Smart Reminders</h3>
                <p className="text-gray-600">
                  Never miss an appointment with automated SMS and email notifications
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;