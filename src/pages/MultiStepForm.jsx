import React, { useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi";
import { Link } from "react-router-dom";
import { MdEmergency } from "react-icons/md";

function MultiStepForm() {
  const [emergency, setEmergency] = useState("What is your emergency?");
  const [showOtherEmergencies, setshowOtherEmergencies] = useState(false);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    location: "",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    // Example: You might send the form data to the server here
  };
  const [disableNext, setDisableNext] = useState(true);

  useEffect(() => {
    // Perform validation before allowing to proceed
    if (step === 1) {
      if (
        formData.firstName.trim() === "" ||
        formData.lastName.trim() === "" ||
        formData.phone.trim() === ""
      ) {
        // If any required field is empty, disable the "Next" button
        setDisableNext(true);
      } else {
        // If all required fields are filled, enable the "Next" button
        setDisableNext(false);
      }
    } else if (step === 2) {
      if (showOtherEmergencies) {
        if (
          formData.location.trim() === "" ||
          formData.otherEmergency.trim() === ""
        ) {
          // If any required field is empty, disable the "Submit" button
          setDisableNext(true);
        } else {
          // If all required fields are filled, enable the "Submit" button
          setDisableNext(false);
        }
      } else {
        if (formData.location.trim() === "" || formData.emergency === "") {
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
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="border-2 border-neutral-300 h-12 px-5 rounded-xl outline-none focus:outline-none focus:border-neutral-500 transition-all duration-200 ease-in-out"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
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
              <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
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
                onClick={handleSubmit}
                disabled={disableNext}
              >
                Submit
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-neutral-200 h-screen w-screen overflow-hidden flex items-center justify-center">
      <div className="w-[50%] rounded-2xl p-6 border border-neutral-200 shadow-xl bg-white flex flex-col gap-6">
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
