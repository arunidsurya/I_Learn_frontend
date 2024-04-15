import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TERipple } from "tw-elements-react";
import axios from "axios";

const EditUser: React.FC = () => {
  const [_id, set_Id] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [error, setError] = useState<string>("");
  const Navigate = useNavigate();

  const location = useLocation();

  // Retrieve user data from location state
  const userData = location.state;

  // Set initial state of input fields with user data
  useEffect(() => {
    if (userData) {
      setName(userData.name || "");
      setEmail(userData.email || "");
      setGender(userData.gender || "");
      set_Id(userData._id || "");
    }
  }, [userData]);

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axios
      .post(
        "http://localhost:5000/api/v1/admin/editUser",
        { _id, name, email, gender },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          setError("");
          Navigate("/admin/users");
        } else {
          setError(res.data.user.message);
        }
      });
  };

  return (
    <section className="h-full  flex justify-center items-center">
      <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
        <h1 className="text-2xl font-bold mb-10 text-center">EDIT USER</h1>
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
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              className="w-full border border-gray-300 rounded h-10"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
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

export default EditUser;
