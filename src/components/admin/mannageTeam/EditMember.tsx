import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TERipple } from "tw-elements-react";
import axios from "axios";

const EditMember: React.FC = () => {
  const [_id, set_Id] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [institute, setInstitute] = useState<string>("");
  const [qualifiaction, setQualifiaction] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [error, setError] = useState<string>("");
  const Navigate = useNavigate();

  const location = useLocation();

  // Retrieve user data from location state
  const tutorData = location.state;

  // Set initial state of input fields with user data
  useEffect(() => {
    if (tutorData) {
      setName(tutorData.name || "");
      setEmail(tutorData.email || "");
      setInstitute(tutorData.institute || "");
      setQualifiaction(tutorData.qualifiaction);
      setExperience(tutorData.experience);
      set_Id(tutorData._id || "");
    }
  }, [tutorData]);

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .put(
        "http://localhost:5000/api/v1/admin/editTutor",
        { _id, name, email, institute, qualifiaction, experience },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          setError("");
          Navigate("/admin/manage_members");
        } else {
          setError(res.data.user.message);
        }
      });
  };

  return (
    <section className="h-full  flex justify-center items-center">
      <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
        <h1 className="text-2xl font-bold mb-10 text-center">EDIT Member</h1>
        <form onSubmit={handleSignUp}>
          {error && <p className="text-red-500">{error}</p>}

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Enter Your Name..."
              className="w-full border border-gray-300 rounded h-10"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter email..."
              className="w-full border border-gray-300 rounded h-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="institute">Institute</label>
            <input
              type="institute"
              placeholder="Enter Institute name..."
              className="w-full border border-gray-300 rounded h-10"
              value={institute}
              onChange={(e) => setInstitute(e.target.value)}
            />
            <label htmlFor="qualification">Qualification</label>
            <input
              type="text"
              placeholder="Enter qualification..."
              className="w-full border border-gray-300 rounded h-10"
              value={qualifiaction}
              onChange={(e) => setQualifiaction(e.target.value)}
            />
            <label htmlFor="experience">Experience</label>
            <input
              type="text"
              placeholder="Experience in years..."
              className="w-full border border-gray-300 rounded h-10"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            />
          </div>

          <div className="text-center lg:text-left">
            <TERipple rippleColor="light">
              <button
                type="submit"
                className="inline-block rounded bg-blue-500 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              >
                submit
              </button>
            </TERipple>
          </div>
        </form>
      </div>
    </section>
  );
};

export default EditMember;
