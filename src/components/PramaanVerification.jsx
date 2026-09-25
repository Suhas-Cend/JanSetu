import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';

export function PramaanVerification() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sequence = [
      setTimeout(() => setStep(1), 800),  // Location
      setTimeout(() => setStep(2), 1600), // Timestamp
      setTimeout(() => setStep(3), 2600), // Cost Benchmarking
      setTimeout(() => setStep(4), 3400), // Image Tampering
      setTimeout(() => setStep(5), 4400), // Before/After Visual
      setTimeout(() => setStep(6), 5500), // Final Score Reveal
    ];
    return () => sequence.forEach(clearTimeout);
  }, []);

  const StepRow = ({ label, currentStep, requiredStep, status, extraData }) => {
    if (currentStep < requiredStep) return null;
    return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 flex flex-col gap-2 p-4 bg-gray-800 rounded-lg mb-3">
        <div className="flex items-center justify-between">
          <span className="font-bebas text-xl tracking-wide">{label}</span>
          {status === 'loading' ? <Loader2 className="animate-spin text-blue-400" /> : 
           status === 'pass' ? <CheckCircle2 className="text-emerald-500" /> : 
           <XCircle className="text-red-500" />}
        </div>
        {extraData && <div className="mt-2 text-sm text-gray-400">{extraData}</div>}
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="font-bebas text-4xl mb-8 text-center tracking-wider text-blue-400">Pramaan Agent Verification</h1>
      
      <div className="space-y-4">
        <StepRow label="Location Verification" currentStep={step} requiredStep={1} status="pass" />
        <StepRow label="Timestamp Integrity" currentStep={step} requiredStep={2} status="pass" />
        <StepRow 
          label="Cost Analysis Benchmarking" 
          currentStep={step} 
          requiredStep={3} 
          status="pass" 
          extraData={
            <div className="w-full bg-gray-900 rounded-full h-4 mt-2 overflow-hidden flex">
               {/* Mock Bar Chart */}
               <div className="bg-emerald-500 h-full w-[60%]" title="Reported Cost"></div>
               <div className="bg-gray-600 h-full w-[40%]" title="Average Benchmark"></div>
            </div>
          }
        />
        <StepRow label="Forensic Image Analysis" currentStep={step} requiredStep={4} status="pass" extraData="No tampering detected." />
        
        {step >= 5 && (
          <div className="animate-in fade-in duration-700 grid grid-cols-2 gap-4 my-6">
            <div className="h-40 bg-gray-700 rounded flex items-center justify-center text-gray-500 border border-dashed border-gray-600">Before Context</div>
            <div className="h-40 bg-gray-700 rounded flex items-center justify-center text-gray-500 border border-dashed border-gray-600">After Context</div>
          </div>
        )}

        {step >= 6 && (
          <div className="animate-in zoom-in duration-700 mt-12 text-center p-8 bg-gray-800 rounded-2xl border-2 border-emerald-500/30 shadow-[0_0_40px_rgba(16,185,129,0.15)]">
            <div className="text-emerald-400 font-bebas text-6xl mb-4">98%</div>
            <h2 className="font-bebas text-3xl text-white">✅ Auto-Approved</h2>
            <p className="text-gray-400 mt-2 text-lg">Seva Coins Earned: 150</p>
          </div>
        )}
      </div>
    </div>
  );
}
