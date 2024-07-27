import React from "react";
import Placecard from "./Placecard";

function Itinerary({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-2xl mt-7 flex mb-7 items-center ">
        Places to Visit
      </h2>
      <div className=" ">
        {trip.tripData?.itinerary.map((item, index) => (
          <div className="">
            <h2 className="font-bold text-lg mt-2 ">{item.day}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {item.plan.map((place, index) => (
                <div key={index}>
                  <h2 className="font-medium mt-2 text-sm text-amber-400">
                    {place.bestTime}
                  </h2>
                  <Placecard place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Itinerary;
