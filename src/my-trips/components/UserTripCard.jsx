import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import { Map, MapPin, Send, UsersRoundIcon, Wallet2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserTripCard({ trip }) {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    const GetPlacePhoto = async () => {
      const data = {
        textQuery: trip?.userSelection?.location?.label,
      };

      try {
        const result = await GetPlaceDetails(data);
        console.log("GetPlaceDetails result:", result);

        if (result.data.places[0]?.photos?.length > 8) {
          const photoName = result.data.places[0].photos[8].name;
          const constructedPhotoUrl = PHOTO_REF_URL.replace(
            "{NAME}",
            photoName
          );
          console.log("Constructed Photo URL:", constructedPhotoUrl);
          setPhotoUrl(constructedPhotoUrl);
        } else {
          console.warn("No photo found at index 8");
          setPhotoUrl("/fallback-image.jpg"); // Optional: Set a fallback image if available
        }
      } catch (error) {
        console.error("Error fetching photo details:", error);
        setPhotoUrl("/fallback-image.jpg"); // Optional: Set a fallback image if available
      }
    };

    if (trip?.userSelection?.location?.label) {
      GetPlacePhoto();
    }
  }, [trip]);

  return (
    <Link to={'/view-trip/'+trip?.id}>
    <div className="hover:scale-105">
      <img
        src={photoUrl}
        className="h-[400px] w-[400px] object-cover rounded-lg"
        alt="Trip Hero"
      />

      <div className="flex flex-col lg:flex-row justify-between items-center mt-5 space-y-5 lg:space-y-0 lg:space-x-5">
        <div className="flex flex-col gap-2 sm:text-sm md:text-base lg:text-lg">
          <h2 className="font-bold text-2xl flex items-center gap-1">
            <MapPin className="h-6 w-6 md:h-8 md:w-8" />
            Location: {trip?.userSelection?.location?.label}
          </h2>
          <div className="flex flex-wrap gap-3">
            <h2 className="px-3 flex items-center gap-1 bg-gray-200 rounded-md p-1 text-gray-500">
              <Map className="h-5 w-5 md:h-6 md:w-6" />
              Travelling days: {trip?.userSelection?.noOfDays}
            </h2>
            <h2 className="px-3 flex items-center gap-1 bg-gray-200 rounded-md p-1 text-gray-500">
              <UsersRoundIcon className="h-5 w-5 md:h-6 md:w-6" />
              Travelers: {trip?.userSelection?.traveler}
            </h2>
            <h2 className="px-3 flex items-center gap-1 bg-gray-200 rounded-md p-1 text-gray-500">
              <Wallet2 className="h-5 w-5 md:h-6 md:w-6" />
              Budget category: {trip?.userSelection?.budget}
            </h2>
          </div>
        </div>
      </div>
    </div>
    </Link>
  );
}

export default UserTripCard;
