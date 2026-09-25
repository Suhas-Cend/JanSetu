import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

export function AwaazCard({ issue }) {
  const [anumodan, setAnumodan] = useState(issue.anumodanCount);

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg mb-8 max-w-2xl shrink-0">
      <div className="h-64 bg-gray-700 w-full object-cover">
        {/* Placeholder for actual image */}
        <img src={issue.imageUrl} alt={issue.title} className="w-full h-full object-cover opacity-80" />
      </div>
      
      <div className="p-6 relative">
        <div className="absolute top-6 right-6 flex items-center gap-2">
          <button 
            onClick={() => setAnumodan(prev => prev + 1)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-bold text-sm transition-colors"
          >
            🔥 Anumodan
          </button>
          <span className="bg-gray-700 text-white px-3 py-2 rounded font-bebas text-lg">
            {anumodan}
          </span>
        </div>

        <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded ${
          issue.severity === 'Major' ? 'bg-red-900 text-red-200' : 'bg-yellow-900 text-yellow-200'
        }`}>
          {issue.severity}
        </span>
        
        <h3 className="font-bebas text-3xl mt-3 mb-2">{issue.title}</h3>
        <p className="text-gray-400 line-clamp-2 mb-4">{issue.description}</p>
        
        <div className="flex items-center gap-1 text-gray-500 text-sm">
          <MapPin size={16} />
          <span>{issue.location}</span>
        </div>
      </div>
    </div>
  );
}
