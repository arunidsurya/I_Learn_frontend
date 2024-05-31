import React from "react";
import image1 from '../../../assets/abouPageImage1.jpg'
import { Link } from "react-router-dom";

const AboutPage: React.FC = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row max-h-[400px] justify-between bg-lime-900 text-white">
        <div className=" flex  flex-col flex-1 justify-center items-center text-center ">
          <h1 className="text-[3rem] font-bold">Welcome to where </h1>
          <h1 className="text-[3rem] font-bold">possibilities begin</h1>
        </div>
        <div className="flex flex-1 bg-cover min-h-[40%] ">
          <img src={`${image1}`} alt="" />
        </div>
      </div>
      <div className="bg-black flex justify-center items-center text-white text-center min-h-[50px] text-[1.3rem] font-bold p-4">
        <Link to={'#'}>Check out our latest company news!</Link>
      </div>
      <div className="flex flex-col justify-center text-center items-center my-10 mx-[32%]">
        <h1 className="text-[2.4rem] font-bold mt-10 mb-8">
          Skills are the key to unlocking potential
        </h1>
        <h1>
          Whether you want to learn a new skill, train your teams, or share what
          you know with the world, you’re in the right place. As a leader in
          online learning, we’re here to help you achieve your goals and
          transform your life.
        </h1>
      </div>
    </>
  );
};

export default AboutPage;
