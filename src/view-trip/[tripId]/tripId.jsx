import { db } from "@/service/firebase";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import InfoSection from "../components/infoSection";
import Hotels from "../components/Hotels";
import Itinerary from "../components/Itinerary";

function ViewTrip() {
  const { tripId } = useParams();
  const [trip,setTrip]=useState([]);

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);   //use to get trip information from firebase

  const GetTripData = async () => {
    const docRef = doc(db, "AITrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document:", docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("No such document");
      toast("No trip found");
    }
  };
  return <div className="p-10 md:px-20 lg:px-44 xl:px-56">
    <InfoSection trip={trip}/>
    <Hotels trip={trip}/>
    <Itinerary trip={trip}/>
  </div>;
}

export default ViewTrip;
