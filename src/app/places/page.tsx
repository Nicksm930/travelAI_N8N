'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2, MapPin, Utensils, AlertCircle } from 'lucide-react';
import Image from 'next/image';

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

const PlacesPage = () => {
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
        
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6 animate-slide-in">
            <MapPin className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-semibold text-white font-playfair">Top Places to Visit</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.places.map((place, index) => (
              <div 
                key={index} 
                className="rounded-xl bg-slate-800/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={place.imgUrl}
                    alt={place.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-white font-playfair">{place.name}</h3>
                  <p className="text-slate-300 mb-4 font-montserrat">{place.description}</p>
                  <div className="space-y-2 text-sm text-slate-400 font-montserrat">
                    <p>🏷️ Category: {place.category}</p>
                    <p>⏰ Recommended Time: {place.recommended_time}</p>
                    <p>💰 Entry Fee: {place.entry_fee}</p>
                    <p className="mt-4 text-sm italic text-slate-300">💡 {place.tips}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12 animate-fade-in" style={{ animationDelay: '300ms' }}>
          <div className="flex items-center gap-2 mb-6">
            <Utensils className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-semibold text-white font-playfair">Local Cuisine</h2>
          </div>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div className="grid gap-6">
              {data.local_cuisine.map((dish, index) => (
                <div key={index} className="border-b border-slate-700 last:border-0 pb-4 last:pb-0">
                  <h3 className="font-bold text-lg text-white mb-2 font-playfair">{dish.dish}</h3>
                  <p className="text-slate-300 mb-2 font-montserrat">{dish.description}</p>
                  <p className="text-sm text-slate-400 font-montserrat">👨‍🍳 Recommended at: {dish.recommended_place}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="animate-fade-in" style={{ animationDelay: '400ms' }}>
          <h2 className="text-2xl font-semibold mb-6 text-white font-playfair">Travel Tips</h2>
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <ul className="space-y-4">
              {data.travel_tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-blue-400 mt-1">✓</span>
                  <span className="text-slate-300 font-montserrat">{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PlacesPage;