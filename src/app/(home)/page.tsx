'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

type FormInputFields = {
  city: string;
  country: string;
};

const Home = () => {
  const [formField, setFormField] = useState<FormInputFields>({
    city: '',
    country: ''
  });

  const router = useRouter();

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch('/api/places', {
        method: 'POST',
        body: JSON.stringify(formField),
        headers: { 'Content-Type': 'application/json' },
      });

      // const data = await response.json();

      // Navigate to results page with query params or state
      router.push(`/places?city=${formField.city}&country=${formField.country}`);
    } catch (error) {
      console.log('Failed to fetch:', error);
    }
  };

  return (
    <div className="w-full flex justify-center items-center h-[94.7vh] bg-[url('https://images.unsplash.com/photo-1741134774077-e110d80e077c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDMyfEZ6bzN6dU9ITjZ3fHxlbnwwfHx8fHw%3D')] bg-no-repeat bg-cover">
      <div className="p-8 rounded-2xl shadow-xl w-5xl h-fit bg-neutral-100/50">
        <h1 className="text-4xl font-bold mb-10 text-center">Explore Destinations</h1>
        <form className="space-y-4 flex flex-col items-center gap-5" onSubmit={submitHandler}>
          <div className="flex gap-5 w-full">
            <input
              name="city"
              value={formField.city}
              onChange={(e) =>
                setFormField((prev) => ({
                  ...prev,
                  city: e.target.value,
                }))
              }
              type="text"
              placeholder="City"
              className="w-full text-xl px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-800"
            />
            <input
              name="country"
              value={formField.country}
              onChange={(e) =>
                setFormField((prev) => ({
                  ...prev,
                  country: e.target.value,
                }))
              }
              type="text"
              placeholder="Country"
              className="w-full text-xl px-4 py-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-800"
            />
          </div>
          <button
            type="submit"
            className="hover:cursor-pointer text-xl bg-neutral-800 text-white p-5 w-1/2 rounded-lg hover:bg-neutral-900 transition duration-300"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
