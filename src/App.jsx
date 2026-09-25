import React from 'react';
import AppLayout from './components/AppLayout';
import { AwaazCard } from './components/AwaazCard';
import { SabootForm } from './components/SabootForm';
import { PramaanVerification } from './components/PramaanVerification';

export default function App() {
  const sampleIssue = {
    id: 1,
    title: "Massive Pothole on Main Street",
    description: "Deep pothole causing severe traffic slowdowns and vehicle damage near the central market.",
    location: "Main St. & 4th Ave",
    severity: "Major",
    anumodanCount: 142,
    imageUrl: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&q=80&w=600"
  };

  return (
    <AppLayout role="citizen">
      <div className="space-y-16 max-w-4xl mx-auto pb-20">
        <section>
          <h2 className="text-2xl text-emerald-400 font-bebas mb-6 border-b border-gray-700 pb-2">
            Screen 2 Preview: Citizen Feed
          </h2>
          <AwaazCard issue={sampleIssue} />
        </section>

        <section>
          <h2 className="text-2xl text-emerald-400 font-bebas mb-6 border-b border-gray-700 pb-2">
            Screen 4 Preview: Officer Saboot
          </h2>
          <SabootForm issueId={1} />
        </section>

        <section>
          <h2 className="text-2xl text-emerald-400 font-bebas mb-6 border-b border-gray-700 pb-2">
            Screen 5 Preview: Pramaan AI
          </h2>
          <PramaanVerification />
        </section>
      </div>
    </AppLayout>
  );
}
