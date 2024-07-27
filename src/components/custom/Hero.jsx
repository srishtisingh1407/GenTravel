import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="relative w-full bg-white">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="flex flex-col justify-center px-4 py-12 md:py-16 lg:col-span-7 lg:gap-x-6 lg:px-6 lg:py-24 xl:col-span-6">
          <div className="mt-8 flex max-w-max items-center space-x-2 rounded-full bg-gray-100 p-1">
            <div className="rounded-full bg-white p-1 px-2">
              <p className="text-sm font-medium">You relax</p>
            </div>
            <p className="text-sm font-medium"> We plan&rarr;</p>
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-6xl">
            Discover the World Effortlessly:
          </h1>
          <p className="mt-6 text-lg text-gray-700">
            AI-powered trip planner providing tailored travel experiences,
            optimizing every detail of your journey!
          </p>
          <br />
          <Link to={"/create-trip"}>
            {" "}
            <Button>Get Started!</Button>
          </Link>
        </div>

        <div className="relative lg:col-span-5 lg:-mr-8 xl:col-span-6">
          <img
            className="mt-16 aspect-[3/2] bg-gray-50 object-cover lg:aspect-[4/3] lg:h-[500px] xl:aspect-[16/9]"
            src="https://e0.pxfuel.com/wallpapers/1018/535/desktop-wallpaper-travel-nature-adventure-travel-graphy-travel-aesthetic-travel-adventure-map.jpg"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
