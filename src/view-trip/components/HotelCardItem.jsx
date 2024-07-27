import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState('');

  useEffect(() => {
    const GetPlacePhoto = async () => {
      const data = {
        textQuery: hotel.hotelName,
      };

      try {
        const result = await GetPlaceDetails(data);
        if (result.data.places[0]?.photos?.length > 8) {
          const photoName = result.data.places[0].photos[1].name;
          const url = PHOTO_REF_URL.replace("{NAME}", photoName);
          setPhotoUrl(url);
        } else {
          console.warn("No photo found at index 8");
          setPhotoUrl('/fallback-image.jpg'); // Optional: Set a fallback image if available
        }
      } catch (error) {
        console.error("Error fetching photo details:", error);
        setPhotoUrl('/fallback-image.jpg'); // Optional: Set a fallback image if available
      }
    };

    if (hotel) {
      GetPlacePhoto();
    }
  }, [hotel]);

  return (
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(hotel.hotelName) +
        "," +
        encodeURIComponent(hotel?.hotelAddress)
      }
      target="_blank"
      className="transform hover:scale-105 transition-transform duration-300"
    >
      <div className="bg-white shadow-lg rounded-xl overflow-hidden w-80 h-96 flex flex-col">
        <img
          src={photoUrl}
          alt={hotel.hotelName}
          className="w-full h-48 object-cover"
        />
        <div className="p-4 flex flex-col flex-grow justify-between">
          <div>
            <h3 className="font-semibold text-lg mb-1">{hotel.hotelName}</h3>
            <p className="font-light text-sm text-gray-600 mb-2 truncate">
              {hotel.hotelAddress}
            </p>
          </div>
          <div>
            <p className="font-medium text-xl text-indigo-600 mb-2">
              {hotel?.price}
            </p>
            <div className="flex items-center">
              <Star className="h-5 text-yellow-400 mr-1" />
              <p className="font-medium">{hotel.rating}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default HotelCardItem;
