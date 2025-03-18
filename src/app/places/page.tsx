'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2, AlertCircle } from 'lucide-react';
import { Suspense } from 'react';

interface Place {
  name: string;
  description: string;
  category: string;
  recommended_time: string;
  entry_fee: string;
  tips: string;
  imgUrl: string;
}

interface Cuisine {
  dish: string;
  description: string;
  recommended_place: string;
}

interface TravelData {
  places: Place[];
  local_cuisine: Cuisine[];
  travel_tips: string[];
}

const PlacesContent = () => {
  const searchParams = useSearchParams();
  const city = searchParams.get('city');
  const country = searchParams.get('country');
  const [data, setData] = useState<TravelData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`/api/places`, {
          method: 'POST',
          body: JSON.stringify({ city, country }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch travel data');
        }

        const result = await response.json();
        setData(result.output[0].output);
      } catch (error) {
        console.error('Failed to fetch:', error);
        setError('Failed to load travel information. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (city && country) fetchData();
  }, [city, country]);

  if (!city || !country) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center p-8 bg-slate-800/50 rounded-lg shadow-lg backdrop-blur-sm animate-fade-in">
          <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white font-playfair">Missing Location Details</h1>
          <p className="mt-2 text-slate-300 font-montserrat">Please provide both a city and country to explore travel information.</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center animate-fade-in">
          <Loader2 className="w-12 h-12 animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-xl text-slate-300 font-montserrat">Loading travel information...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center p-8 bg-slate-800/50 rounded-lg shadow-lg backdrop-blur-sm animate-fade-in">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white font-playfair">Error</h1>
          <p className="mt-2 text-slate-300 font-montserrat">{error}</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white font-playfair">
            Explore {city}, {country}
          </h1>
          <p className="text-lg text-slate-300 font-montserrat">Discover the best places, food, and local tips</p>
        </div>
        {/* Render all content sections here */}
      </div>
    </div>
  );
};

const PlacesPage = () => {
  return (
    <Suspense fallback={<div className="text-center text-slate-300">Loading content...</div>}>
      <PlacesContent />
    </Suspense>
  );
};

export default PlacesPage;
