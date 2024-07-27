import { Hotel, Star } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import HotelCardItem from "./HotelCardItem";

// Conversion rate from USD to INR (example rate, update to the current rate)
const USD_TO_INR = 75;

function Hotels({ trip }) {
  return (
    <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-6 text-center">
        <h2 className="font-bold text-3xl mb-12 flex justify-center items-center text-indigo-600">
          <Hotel className="h-10 mr-3 text-indigo-600" />
          Hotel Recommendations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {trip?.tripData?.hotels?.map((hotel, index) => (
            <HotelCardItem
              key={index} // Add key prop here
              hotel={hotel}
              priceInRupees={hotel.priceInUSD * USD_TO_INR} // Pass converted price
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Hotels;
