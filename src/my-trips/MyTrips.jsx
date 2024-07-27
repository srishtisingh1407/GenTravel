import { db } from '@/service/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTripCard from './components/UserTripCard';

function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/");
      return;
    }

    try {
      const q = query(
        collection(db, "AITrips"),
        where("userEmail", "==", user?.email)
      );

      const querySnapshot = await getDocs(q);
      const trips = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        trips.push(doc.data());
      });

      setUserTrips(trips); // Reset the state with the fetched trips
      console.log("User Trips: ", trips);
    } catch (error) {
      console.error("Error fetching user trips:", error);
    }
  };

  return (
    <div className="px-5 sm:px-10 md:px-32 lg:px-56 xl:px-10 mt-20 mx-5 sm:mx-10 md:mx-32 lg:mx-56 xl:mx-10">
      <h2 className='mt-10 font-bold text-3xl'>My Trips</h2>

      <div className='mt-10 grid grid-cols-2 md:grid-cols-2 gap-5'>
        {userTrips.length > 0 ? (
          userTrips.map((trip, index) => (
            <UserTripCard key={index} trip={trip} />
          ))
        ) : (
          <p>No trips found.</p>
        )}
      </div>
    </div>
  );
}

export default MyTrips;
