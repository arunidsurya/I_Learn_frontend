import React from "react";
import backgroundImage from "../../../assets/TeachersBackground.jpg";
import image1 from "../../../assets/teachImage1.jpg";
import image2 from "../../../assets/teacheImage2.jpg";
import image3 from "../../../assets/teacherImage4.jpg";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

const TeachOnILearn: React.FC = () => {
    const navigate =useNavigate()
  return (
    <div>
      <Header />
      <div
        className="flex bg-cover bg-center min-h-[500px]"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="ml-32 mt-32 text-center justify-center">
          <h1 className="text-[3rem] ">Come teach with us</h1>
          <h1 className="text-[1.5rem]">Become an instructor and</h1>
          <h1 className="text-[1.5rem]">change lives - including your own</h1>
          <button className="w-32 h-10 bg-slate-600 mt-10 text-white rounded-lg" onClick={()=> navigate("/inst_login")}>
            Get started
          </button>
        </div>
      </div>

      <div>
        <h1 className="flex justify-center text-center items-center mt-10 mb-10 text-[3rem]">
          So many reasons to start
        </h1>
        <div className="flex flex-col sm:flex-row justify-between mx-48 my-20 gap-8">
          <div className="flex flex-col flex-1 max-w-[20%] min-w-[200px] items-center text-center justify-center">
            <div className="mb-4">
              <img src={image1} alt="Teach your way" />
            </div>
            <h1 className="font-bold text-[1.2rem]">Teach your way</h1>
            <h1>
              Publish the course you want, in the way you want, and always have
              control of your own content.
            </h1>
          </div>
          <div className="flex flex-col flex-1 max-w-[20%] min-w-[200px] items-center text-center justify-center">
            <div className="mb-4">
              <img src={image2} alt="Inspire learners" />
            </div>
            <h1 className="font-bold text-[1.2rem]">Inspire learners</h1>
            <h1>
              Teach what you know and help learners explore their interests,
              gain new skills, and advance their careers.
            </h1>
          </div>
          <div className="flex flex-col flex-1 max-w-[20%] min-w-[200px] items-center text-center justify-center">
            <div className="mb-4">
              <img src={image3} alt="Expand your network" />
            </div>
            <h1 className="font-bold text-[1.2rem]">Expand your network</h1>
            <h1>
              Expand your professional network, build your expertise, and earn
              money on each paid enrollment.
            </h1>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TeachOnILearn;
