import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Create from "./create-trip/create.jsx";
import Header from "./components/custom/Header.jsx";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ViewTrip from "./view-trip/[tripId]/tripId.jsx";
import Footer from "./components/custom/Footer.jsx";
import ContactUs from "./components/contact/contactUs.jsx";
import MyTrips from "./my-trips/MyTrips.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "/create-trip",
    element: <Create />,
  },
  {
    path: "/view-trip/:tripId",
    element: <ViewTrip />,
  },
  {
    path: "/contact-us",
    element: <ContactUs/>,
  },
  {
    path: "/my-trips",
    element: <MyTrips/>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Header />
      <Toaster />
      <RouterProvider router={router} />
      <Footer/>
    </GoogleOAuthProvider>
    
  </React.StrictMode>
);
