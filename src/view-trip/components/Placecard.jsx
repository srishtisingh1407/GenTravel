import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { Target } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Placecard({ place }) {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    place && GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place.placeName
    };
    const result = await GetPlaceDetails(data).then((resp) => {
      console.log(resp.data.places[0].photos[2].name);

      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[2].name
      );
      setPhotoUrl(PhotoUrl);
    });
  };
  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        place.placeName
      )}`}
      target="_blank"
      className="block"
    >
      <div className="shadow-md border rounded-sm p-4 mt-3 flex flex-col md:flex-row gap-5 hover:scale-105 transition-transform duration-300">
        <img
          src={photoUrl}
          alt={place.placeName}
          className="w-full h-48 md:w-48 md:h-36 object-cover rounded-lg"
        />
        <div className="mt-3 md:mt-0 flex flex-col justify-between">
          <h2 className="font-bold text-xl md:text-lg">{place.placeName}</h2>
          <p className="font-medium text-sm md:text-base">
            {place.placeDetails}
          </p>
          <p className="font-medium text-sm md:text-base">
            <span className="text-orange-400">Travel Hours :</span>{" "}
            {place.timeToTravel}
          </p>
          <p className="font-medium text-green-500 text-sm md:text-base">
            {place.ticketsPricing}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Placecard;
