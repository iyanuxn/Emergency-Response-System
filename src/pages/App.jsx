import { MdEmergency } from "react-icons/md";
import { Link } from "react-router-dom";
import hero from "../assets/hero.jpg";

const App = () => {
  return (
    <div className="w-screen h-screen overflow-hidden flex flex-col">
      <div className="flex h-[96%]">
        <div className="w-[55%] h-full p-20 bg-neutral-100 flex flex-col gap-20">
          <div className="flex items-center gap-3">
            <MdEmergency className="w-7 h-7" />
            Emergency Response Inc.
          </div>
          <div className="flex flex-col gap-7">
            <h1 className="text-6xl font-bold">
              Empowering Safety <br /> One Alert at a Time.
            </h1>
            <span className="tracking-wide leading-relaxed w-3/4 font-medium text-black text-opacity-60">
              In times of crisis, every second counts. That's why we're here.
              Our emergency response system is designed to provide swift
              assistance when you need it most. Whether it's a medical
              emergency, natural disaster, or any urgent situation, we're
              dedicated to keeping you safe.
            </span>
            <Link to="/form" className="bg-black flex items-center h-12 px-10 w-fit font-medium text-white hover:translate-x-2 hover:-translate-y-2 hover:shadow-[-10px_10px_0px_1px_rgba(0,0,0,0.3)]
             transition-all duration-200 ease-in-out rounded-lg">Get Started</Link>
          </div>
        </div>
        <div className="w-[45%] h-full relative">
          <div className="w-full h-full absolute bg-black bg-opacity-50"></div>
          <img src={hero} alt="hero" className="w-full h-full object-cover" />
        </div>
      </div>
      <footer className="w-full h-[5%] px-20 text-xs bg-black text-neutral-400 flex items-center">
        Emergency Response Inc. Copyright 2024
      </footer>
    </div>
  );
};

export default App;
<div className="w-[80%] h-full bg-blue-500"></div>;
