import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "@/constants/options";
import { chatSession } from "@/service/AIModal";
import React, { useEffect, useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebase";
import { useNavigate } from "react-router-dom";

function Create() {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); //navigating to next page

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const login = useGoogleLogin({
    onSuccess: (tokenInfo) => getUserProfile(tokenInfo),
    onError: (error) => console.log(error),
  });

  const onGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (
      (formData.noOfDays > 5 && !formData.location) ||
      !formData.budget ||
      !formData.traveler
    ) {
      toast("Please fill all the details");
      return;
    }

    setLoading(true);
    try {
      const FINAL_PROMPT = AI_PROMPT.replace(
        "{location}",
        formData.location.label
      )
        .replace("{totalDays}", formData.noOfDays)
        .replace("{traveler}", formData.traveler)
        .replace("{budget}", formData.budget)
        .replace("{totalDays}", formData.noOfDays);

      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log("__", result.response.text());
      await saveAiTrip(result.response.text());
    } catch (error) {
      console.error("Error generating trip:", error);
      toast("Failed to generate trip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const saveAiTrip = async (tripData) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(tripData),
      userEmail: user.email,
      id: docId,
    });

    navigate("/view-trip/" + docId);
  };

  const getUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        onGenerateTrip();
      });
  };

  return (
    <div className="px-5 sm:px-10 md:px-32 lg:px-56 xl:px-10 mt-20 mx-5 sm:mx-10 md:mx-32 lg:mx-56 xl:mx-10">
      <h2 className="font-extrabold text-3xl">
        Where do you want to Travel next?
      </h2>
      <p className="mt-3 text-gray-700">
        What's your next travel destination? Provide your desired location,
        preferred activities, <br className="hidden md:inline" /> and specific
        dates for a personalized itinerary.
      </p>
      <div className="mt-10 flex flex-col gap-10">
        <div>
          <h2 className="text-xl my-3 font-bold">
            What is your destination this time?
          </h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-bold">
            How many days are you planning?
          </h2>
          <Input
            placeholder="Ex. 3"
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
          />
        </div>
        <div>
          <h2 className="text-xl my-3 font-bold">What is your Budget?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`p-4 cursor-pointer border rounded-lg transition ease-in-out 
                  delay-150 hover:shadow-lg hover:shadow-slate-800 ${
                    formData.budget === item.title && "border-black"
                  }`}
              >
                <h2 className="text-4xl">{item.icon}</h2>
                <h2 className="font-bold">{item.title}</h2>
                <h2 className="font-light text-gray-500">{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl my-3 font-bold">How many Travelers?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
          {SelectTravelesList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange("traveler", item.people)}
              className={`p-4 cursor-pointer border rounded-lg transition ease-in-out delay-150 hover:shadow-lg hover:shadow-slate-800 ${
                formData.traveler === item.people && "border-black"
              }`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold">{item.title}</h2>
              <h2 className="font-light text-gray-500">{item.desc}</h2>
              <h2 className="font-light text-gray-500">
                Travelers: {item.people}
              </h2>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10 justify-center flex">
        <Button disabled={loading} onClick={onGenerateTrip}>
          {loading ? (
            <AiOutlineLoading className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip!"
          )}
        </Button>
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" alt="logo" />
              <h2 className="font-bold text-black text-2xl mt-6">
                Sign In with Google!
              </h2>
              <p className="font-medium mt-3">
                Sign in with Google authentication security
              </p>
              <Button
                onClick={login}
                className="w-full mt-6 flex justify-center"
              >
                <FcGoogle className="m-2 h-7 w-7" />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Create;
