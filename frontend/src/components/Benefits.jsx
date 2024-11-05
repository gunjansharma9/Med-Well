import React from 'react';

const Benefits = () => {
  return (
    <div>
      <div className="py-12 px-6 sm:px-12 lg:px-24 mt-[-80px] rounded-lg max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-10">
          Benefits of Online Consultation
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex items-start space-x-4">
            <span className="text-green-600 text-2xl">✔️</span>
            <div>
              <h3 className="text-xl font-semibold">Consult Top Doctors 24x7</h3>
              <p className="text-gray-600">
                Connect instantly with a 24x7 specialist or choose to video visit a particular doctor.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <span className="text-green-600 text-2xl">✔️</span>
            <div>
              <h3 className="text-xl font-semibold">Convenient and Easy</h3>
              <p className="text-gray-600">
                Start an instant consultation within 2 minutes or do video consultation at the scheduled time.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <span className="text-green-600 text-2xl">✔️</span>
            <div>
              <h3 className="text-xl font-semibold">100% Safe Consultations</h3>
              <p className="text-gray-600">
                Be assured that your online consultation will be fully private and secured.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <span className="text-green-600 text-2xl">✔️</span>
            <div>
              <h3 className="text-xl font-semibold">Similar Clinic Experience</h3>
              <p className="text-gray-600">
                Experience clinic-like consultation through a video call with the doctor.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <span className="text-green-600 text-2xl">✔️</span>
            <div>
              <h3 className="text-xl font-semibold">Free Follow-up</h3>
              <p className="text-gray-600">
                Get a valid digital prescription and a 7-day, free follow-up for further clarifications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Benefits;
