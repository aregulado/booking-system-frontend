import React from 'react';
import { BookingProvider } from './context/BookingContext';
import BookingForm from './components/BookingForm';

function App() {
  return (
      <BookingProvider>
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
          <BookingForm />
        </div>
      </BookingProvider>
  );
}

export default App;