import React, { useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";
import { MdEmergency, MdOutlineMyLocation } from "react-icons/md";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

function MultiStepForm() {
  const [emergency, setEmergency] = useState("What is your emergency?");
  const [showOtherEmergencies, setshowOtherEmergencies] = useState(false);
  const [fetchingLocation, setFetchingLocation] = useState(false);
  const [userLocation, setUserLocation] = useState("");
  // lat and long usestate
  const [lat, setLat] = useState("");
  const [long, setLong] = useState("");

  const API_KEY = "AIzaSyDThNsjdA602Dg9t8BdjKONZ - tb6nLqKfw";

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    userLocation: "",
    extraLocationInfo: "",
    emergency: "",
    otherEmergency: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [disableNext, setDisableNext] = useState(true);

  useEffect(() => {
    // Perform validation before allowing to proceed
    if (step === 1) {
      if (formData.name.trim() === "" || formData.phone.trim() === "") {
        // If any required field is empty, disable the "Next" button
        setDisableNext(true);
      } else {
        // If all required fields are filled, enable the "Next" button
        setDisableNext(false);
      }
    } else if (step === 2) {
      if (showOtherEmergencies) {
        if (
          formData.otherEmergency.trim() === "" ||
          formData.userLocation === ""
        ) {
          // If any required field is empty, disable the "Submit" button
          setDisableNext(true);
        } else {
          // If all required fields are filled, enable the "Submit" button
          setDisableNext(false);
        }
      } else {
        if (formData.emergency === "" || formData.userLocation === "") {
          // If any required field is empty, disable the "Submit" button
          setDisableNext(true);
        } else {
          // If all required fields are filled, enable the "Submit" button
          setDisableNext(false);
        }
      }
    }
  }, [step, formData, showOtherEmergencies]);

  const nextStep = () => {
    setStep((prevStep) => prevStep + 1);
  };

  const prevStep = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const emergencyOptions = [
    { name: "Medical Emergency" },
    { name: "Natural Disaster" },
    { name: "Urgent Situation" },
    { name: "Accident" },
    { name: "Other" },
  ];

  const handleEmergencyDropdownToggle = () => {
    setIsEmergencyOpen(!isEmergencyOpen);
  };

  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);

  const handleEmergencyOptionselect = (option) => {
    setEmergency(option);
    setIsEmergencyOpen(false);
    setFormData((prevData) => ({
      ...prevData,
      emergency: option,
    }));
    if (option === "Other") {
      setshowOtherEmergencies(true);
    } else {
      setshowOtherEmergencies(false);
    }
  };

  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          setFetchingLocation(true);
          console.log("Latitude is :", latitude);
          console.log("Longitude is :", longitude);
          setLat(latitude);
          setLong(longitude);

          try {
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${API_KEY}`
            );
            const data = await response.json();

            if (data && data.results && data.results.length > 0) {
              const location = data.results[0].formatted_address;
              setUserLocation(location);
              setFormData((prevData) => ({
                ...prevData,
                userLocation: location,
              }));
            } else {
              alert("Error getting location information");
            }
          } catch (error) {
            console.error("Error fetching location:", error);
          } finally {
            setFetchingLocation(false);
          }
        },
        (error) => {
          console.error("Error getting location", error);
          setFetchingLocation(false);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const [timeLeft, setTimeLeft] = useState(10 * 60);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="flex flex-col h-full gap-10">
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-medium text-neutral-700 mb-2">
                Personal Information
              </h2>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.firstName}
                onChange={handleChange}
                className="border-2 border-neutral-300 h-12 px-5 rounded-xl outline-none focus:outline-none focus:border-neutral-500 transition-all duration-200 ease-in-out"
              />
              <input
                type="phone"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                className="border-2 border-neutral-300 h-12 px-5 rounded-xl outline-none focus:outline-none focus:border-neutral-500 transition-all duration-200 ease-in-out"
              />
            </div>

            <button
              className={`bg-black self-end text-white h-12 px-10 rounded-xl 
              ${
                disableNext
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:translate-x-2 hover:-translate-y-2 hover:shadow-[-10px_10px_0px_1px_rgba(0,0,0,0.3)] transition-all duration-200 ease-in-out"
              }`}
              onClick={nextStep}
              disabled={disableNext}
            >
              Next
            </button>
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col h-full gap-10">
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-medium text-neutral-700 mb-2">
                What is the emergency?
              </h2>
              {userLocation ? (
                <div className="flex items-center gap-2">
                  <MdOutlineMyLocation className="text-2xl" />
                  <span className="text-lg font-semibold">{userLocation}</span>
                </div>
              ) : (
                <button
                  onClick={handleGetLocation}
                  disabled={fetchingLocation}
                  className={`text-white h-12 px-5 flex items-center font-medium gap-2 rounded-xl  ${
                    fetchingLocation
                      ? "bg-red-300 cursor-not-allowed"
                      : "bg-red-500 hover:translate-x-2 hover:-translate-y-2 hover:shadow-[-10px_10px_0px_1px_rgba(0,0,0,1)] transition-all duration-200 ease-in-out"
                  }`}
                >
                  {fetchingLocation
                    ? "Fetching Location..."
                    : "Ping my location "}
                  <MdOutlineMyLocation className="text-2xl" />
                </button>
              )}
              <input
                type="text"
                name="extraLocationInfo"
                placeholder="Additional info on location (optional)"
                value={formData.extraLocationInfo}
                onChange={handleChange}
                className="border-2 border-neutral-300 h-12 px-5 rounded-xl outline-none focus:outline-none focus:border-neutral-500 transition-all duration-200 ease-in-out"
              />
              <div className="flex flex-col gap-1">
                <div className="relative">
                  <button
                    type="button"
                    id="duration"
                    className={`
              ${
                emergency === "What is your emergency?"
                  ? "text-neutral-400 whitespace-nowrap"
                  : "text-black"
              }

              w-full overflow-ellipsis   border border-neutral-300 justify-between md:px-4 px-2 py-3 rounded-xl flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-neutral-500 outline-none
              `}
                    onClick={handleEmergencyDropdownToggle}
                  >
                    {emergency}
                    <FiChevronDown
                      className={
                        isEmergencyOpen
                          ? "transform rotate-180 transition-all duration-300 ease-in-out text-2xl"
                          : "transform rotate-0 transition-all duration-300 ease-in-out text-2xl"
                      }
                    />
                  </button>
                  {isEmergencyOpen && (
                    <div className="absolute z-30 top-full left-0 mt-1 bg-white shadow-md border border-gray-300 rounded-lg w-full">
                      {emergencyOptions.map((option, index) => (
                        <div
                          key={index}
                          onClick={() =>
                            handleEmergencyOptionselect(option.name)
                          }
                          className="cursor-pointer px-4 py-3 hover:bg-gray-100 border-b-2 border-gray-300 border-opacity-30"
                        >
                          {option.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              {showOtherEmergencies && (
                <input
                  type="text"
                  name="otherEmergency"
                  placeholder="Other Emergency"
                  value={formData.otherEmergency}
                  onChange={handleChange}
                  className="border-2 border-neutral-300 h-12 px-5 rounded-xl outline-none focus:outline-none focus:border-neutral-500 transition-all duration-200 ease-in-out"
                />
              )}
            </div>
            <div className="flex items-center gap-2 self-end">
              <button
                className="bg-black self-end text-white h-12 px-10 rounded-xl hover:translate-x-2 hover:-translate-y-2 hover:shadow-[-10px_10px_0px_1px_rgba(0,0,0,0.3)] transition-all duration-200 ease-in-out"
                onClick={prevStep}
              >
                Previous
              </button>
              <button
                className={`bg-black self-end text-white h-12 px-10 rounded-xl 
              ${
                disableNext
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:translate-x-2 hover:-translate-y-2 hover:shadow-[-10px_10px_0px_1px_rgba(0,0,0,0.3)] transition-all duration-200 ease-in-out"
              }`}
                onClick={nextStep}
                disabled={disableNext}
              >
                Submit
              </button>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col h-full gap-10">
            <span>
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-medium text-neutral-700 mb-2">
                  Your Location
                </h2>
                <div className="flex items-center gap-2">
                  <span className="text-blue-400 font-medium">
                    Estimated Time of Arrival:
                  </span>
                  <div className="text-center font-bold">
                    <span>
                      {minutes < 10 ? "0" : ""}
                      {minutes}
                    </span>
                    :
                    <span>
                      {seconds < 10 ? "0" : ""}
                      {seconds}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-neutral-700 text-sm w-[60%]">
                Check the map below for closest emergency response location
                while we dispatch help to your location
              </div>
            </span>
            <div className="flex flex-col gap-4">
              {/* render google map */}
              <div className="h-[400px] -mt-4 rounded-2xl overflow-hidden">
                <LoadScript googleMapsApiKey={API_KEY}>
                  <GoogleMap
                    mapContainerStyle={{
                      height: "100%",
                      width: "100%",
                    }}
                    center={{
                      lat: lat,
                      lng: long,
                    }}
                    zoom={17}
                  >
                    //my marker
                    <Marker
                      position={{
                        lat: lat,
                        lng: long,
                      }}
                      title="My Location"
                    />
                  </GoogleMap>
                </LoadScript>
              </div>
              {/* timer */}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-neutral-200 h-screen w-screen overflow-hidden flex items-center justify-center">
      <div className="w-[60%] rounded-2xl p-6 border border-neutral-200 shadow-xl bg-white flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3  font-semibold text-xl">
            <MdEmergency className="w-7 h-7" />
            Emergency Response Inc.
          </div>
          <Link to="/" className="text-black text-opacity-60">
            Go Back Home
          </Link>
        </div>
        {renderStep()}
      </div>
    </div>
  );
}

export default MultiStepForm;
