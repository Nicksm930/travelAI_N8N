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
        console.log(result.output);
        
        setData(result.output);
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

        {/* Places Section */}
        <section className="mb-12 animate-fade-in">
          <h2 className="text-3xl text-white font-bold mb-6 font-playfair">Top Places to Visit</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.places.map((place, index) => (
              <div
                key={index}
                className="bg-slate-800/70 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition duration-300"
              >
                <img
                  src={place.imgUrl}
                  alt={place.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-2xl text-white font-bold mb-2 font-playfair">{place.name}</h3>
                  <p className="text-slate-300 mb-4 font-montserrat">{place.description}</p>
                  <p className="text-sm text-slate-400">
                    <strong>Category:</strong> {place.category} <br />
                    <strong>Recommended Time:</strong> {place.recommended_time} <br />
                    <strong>Entry Fee:</strong> {place.entry_fee} <br />
                    <strong>Tip:</strong> {place.tips}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cuisine Section */}
        <section className="mb-12 animate-fade-in">
          <h2 className="text-3xl text-white font-bold mb-6 font-playfair">Must-Try Local Cuisine</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.local_cuisine.map((cuisine, index) => (
              <div
                key={index}
                className="bg-slate-800/70 p-6 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300"
              >
                <h3 className="text-2xl text-white font-bold mb-2 font-playfair">{cuisine.dish}</h3>
                <p className="text-slate-300 mb-2 font-montserrat">{cuisine.description}</p>
                <p className="text-sm text-slate-400">
                  <strong>Recommended Place:</strong> {cuisine.recommended_place}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Travel Tips Section */}
        <section className="animate-fade-in">
          <h2 className="text-3xl text-white font-bold mb-6 font-playfair">Travel Tips</h2>
          <ul className="space-y-4 list-disc list-inside text-slate-300 font-montserrat">
            {data.travel_tips.map((tip, index) => (
              <li key={index} className="bg-slate-800/70 p-4 rounded-xl shadow-md">
                {tip}
              </li>
            ))}
          </ul>
        </section>
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
