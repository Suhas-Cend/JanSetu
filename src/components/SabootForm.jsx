import React, { useState, useEffect } from 'react';

export function SabootForm({ issueId }) {
  const [geoData, setGeoData] = useState('Fetching location...');
  const [timestamp, setTimestamp] = useState('');

  useEffect(() => {
    // Simulate auto-capturing non-editable geo/time data
    setTimestamp(new Date().toLocaleString());
    navigator.geolocation.getCurrentPosition(
      (pos) => setGeoData(`${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`),
      () => setGeoData('17.3850° N, 78.4867° E (Fallback)')
    );
  }, []);

  return (
    <form className="max-w-2xl bg-gray-800 p-8 rounded-xl space-y-6">
      <h2 className="font-bebas text-3xl border-b border-gray-700 pb-4">Submit Saboot (Proof of Work)</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <label className="block bg-gray-700 border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-600">
          <span className="block text-sm">Upload Before Image</span>
          <input type="file" className="hidden" required />
        </label>
        <label className="block bg-gray-700 border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-600">
          <span className="block text-sm">Upload After Image</span>
          <input type="file" className="hidden" required />
        </label>
      </div>

      <div className="flex gap-4">
        <input 
          type="number" 
          placeholder="Amount Spent (INR)" 
          className="flex-1 bg-gray-900 border border-gray-700 rounded p-3 text-white" 
          required 
        />
        <label className="flex-1 bg-gray-700 rounded p-3 text-center cursor-pointer hover:bg-gray-600">
          Upload Receipts (PDF/IMG)
          <input type="file" className="hidden" required />
        </label>
      </div>

      <textarea 
        placeholder="Work Description" 
        className="w-full bg-gray-900 border border-gray-700 rounded p-3 text-white min-h-[100px]" 
        required 
      />

      <div className="bg-gray-900 p-4 rounded text-sm text-gray-400 space-y-1">
        <p><strong>Captured Location:</strong> {geoData} 🔒</p>
        <p><strong>Timestamp:</strong> {timestamp} 🔒</p>
      </div>

      <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bebas text-xl py-3 rounded transition-colors">
        Submit to Pramaan AI
      </button>
    </form>
  );
}
