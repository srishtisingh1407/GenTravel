import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const chatSession = model.startChat({
  generationConfig,

  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate Travel Plan for Location : Las Vegas, for 3 Days for a Couple with a Cheap budget, Give me Hotels option list with HotelName, Hotel address, Price, Hotel image url , geo coordinates , rating , description and suggest itinerary with placeName, Place Details, Place image URL, geo Coordinates, tickets pricing, time to travel each location for 3 days with each day plan with best time to visit in JSON format\n",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "hotels": [\n    {\n      "hotelName": "The D Las Vegas",\n      "hotelAddress": "301 Fremont Street, Las Vegas, NV 89101",\n      "price": "$50-$100 per night",\n      "hotelImageURL": "https://www.thed.com/wp-content/uploads/2023/02/The-D-Las-Vegas-Hotel-Casino.jpg",\n      "geoCoordinates": "36.1699° N, 115.1399° W",\n      "rating": "3.5 stars",\n      "description": "A budget-friendly hotel located in the heart of Fremont Street, offering a vibrant atmosphere and easy access to the Fremont Street Experience."\n    },\n    {\n      "hotelName": "Golden Nugget Las Vegas",\n      "hotelAddress": "129 E Fremont Street, Las Vegas, NV 89101",\n      "price": "$70-$150 per night",\n      "hotelImageURL": "https://www.goldennugget.com/las-vegas/media/images/hotel/featured-image-desktop.jpg",\n      "geoCoordinates": "36.1687° N, 115.1411° W",\n      "rating": "4 stars",\n      "description": "A historic hotel known for its luxurious amenities, including a shark tank, and a prime location on Fremont Street."\n    },\n    {\n      "hotelName": "Circus Circus Hotel & Casino",\n      "hotelAddress": "2880 Las Vegas Blvd S, Las Vegas, NV 89109",\n      "price": "$40-$80 per night",\n      "hotelImageURL": "https://www.circuscircus.com/content/dam/caesars/circuscircus/circus-circus-hotel-casino/carousel/carousel-desktop-01.jpg",\n      "geoCoordinates": "36.1129° N, 115.1703° W",\n      "rating": "3 stars",\n      "description": "A budget-friendly option offering a family-friendly atmosphere with a circus theme, carnival rides, and a wide range of entertainment."\n    },\n    {\n      "hotelName": "Plaza Hotel & Casino",\n      "hotelAddress": "1 Main Street, Las Vegas, NV 89101",\n      "price": "$60-$120 per night",\n      "hotelImageURL": "https://www.plazahotelcasino.com/media/images/hotel/featured-image-desktop.jpg",\n      "geoCoordinates": "36.1694° N, 115.1405° W",\n      "rating": "3.5 stars",\n      "description": "A centrally located hotel on Fremont Street offering a classic Las Vegas experience with a range of dining, gaming, and entertainment options."\n    }\n  ],\n  "itinerary": [\n    {\n      "day": "Day 1",\n      "plan": [\n        {\n          "placeName": "Fremont Street Experience",\n          "placeDetails": "A vibrant pedestrian mall with live entertainment, street performers, and a canopy of LED lights.",\n          "placeImageURL": "https://www.fremontstreetexperience.com/media/images/fremont-street-experience-main.jpg",\n          "geoCoordinates": "36.1693° N, 115.1403° W",\n          "ticketsPricing": "Free",\n          "timeToTravel": "2-3 hours",\n          "bestTime": "Evening (for the light shows)"\n        },\n        {\n          "placeName": "Golden Nugget Casino",\n          "placeDetails": "A historic casino known for its luxury amenities and shark tank.",\n          "placeImageURL": "https://www.goldennugget.com/las-vegas/media/images/casino/featured-image-desktop.jpg",\n          "geoCoordinates": "36.1687° N, 115.1411° W",\n          "ticketsPricing": "Free",\n          "timeToTravel": "1-2 hours",\n          "bestTime": "Anytime"\n        }\n      ]\n    },\n    {\n      "day": "Day 2",\n      "plan": [\n        {\n          "placeName": "Hoover Dam",\n          "placeDetails": "A historical dam on the Colorado River, offering stunning views and tours.",\n          "placeImageURL": "https://www.nps.gov/hohe/planyourvisit/images/hooverdam_2019_0426_0014.jpg",\n          "geoCoordinates": "36.0075° N, 114.9674° W",\n          "ticketsPricing": "$30-$40 (for tours)",\n          "timeToTravel": "4-5 hours (including travel time)",\n          "bestTime": "Morning or Afternoon"\n        },\n        {\n          "placeName": "Red Rock Canyon National Conservation Area",\n          "placeDetails": "A scenic area with red rock formations, hiking trails, and scenic drives.",\n          "placeImageURL": "https://www.blm.gov/sites/blm.gov/files/uploads/images/red-rock-canyon-national-conservation-area.jpg",\n          "geoCoordinates": "36.1321° N, 115.2779° W",\n          "ticketsPricing": "$15 per vehicle",\n          "timeToTravel": "2-3 hours",\n          "bestTime": "Morning or Afternoon"\n        }\n      ]\n    },\n    {\n      "day": "Day 3",\n      "plan": [\n        {\n          "placeName": "Bellagio Conservatory & Botanical Garden",\n          "placeDetails": "A stunning display of flowers and sculptures, free to enter.",\n          "placeImageURL": "https://www.bellagio.com/content/dam/mgmresorts/bellagio/conservatory/featured/conservatory-botanical-garden-feature-image.jpg",\n          "geoCoordinates": "36.1117° N, 115.1734° W",\n          "ticketsPricing": "Free",\n          "timeToTravel": "1-2 hours",\n          "bestTime": "Anytime"\n        },\n        {\n          "placeName": "The LINQ Promenade",\n          "placeDetails": "An outdoor shopping and dining promenade with a High Roller observation wheel.",\n          "placeImageURL": "https://www.linq.com/content/dam/caesars/linq/home/carousel/carousel-desktop-01.jpg",\n          "geoCoordinates": "36.1151° N, 115.1727° W",\n          "ticketsPricing": "Free (promenade); $30-$40 (High Roller)",\n          "timeToTravel": "2-3 hours",\n          "bestTime": "Evening (for the lights)"\n        }\n      ]\n    }\n  ]\n}\n```\n\n**Notes:**\n\n* This itinerary focuses on free or low-cost activities. \n* Consider bringing your own snacks and drinks to save money.\n* Take advantage of free shows on the Strip, such as the Bellagio Fountains or the Mirage Volcano.\n* The prices for hotels and attractions are estimates and can vary depending on the time of year and availability. \n* The best time to visit depends on your preferences, but spring and fall offer pleasant weather and fewer crowds.\n* Remember to factor in travel time between attractions, especially when visiting attractions outside of Las Vegas.\n* Always check websites for the latest updates on ticket prices and schedules.',
        },
      ],
    },
  ],
});



