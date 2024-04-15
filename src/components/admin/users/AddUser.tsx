import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TERipple } from "tw-elements-react";
import axios from "axios";

const AddUser: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [error, setError] = useState<string>("");
  const Navigate = useNavigate();

  const handleSignUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError("");

    axios
      .post(
        "http://localhost:5000/api/v1/admin/addUser",
        { name, email, gender, password },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data.success) {
          setError("");
          Navigate("/admin/users");
        } else {
          setError(res.data.message);
        }
      });
  };

  return (
    <section className="h-full mt-10 flex justify-center items-center">
      <div className="w-full md:w-8/12 lg:w-5/12 xl:w-5/12">
        <form onSubmit={handleSignUp}>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex flex-col gap-2">
            <label htmlFor="email">Name</label>
            <input
              type="name"
              placeholder="Enter Your Name... "
              className="w-full border border-gray-300 rounded h-10 "
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Enter email... "
              className="w-full border border-gray-300 rounded h-10 "
              onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              className="w-full border border-gray-300 rounded h-10"
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Enter password... "
              className="w-full border border-gray-300 rounded h-10 "
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="password">Re-Password</label>
            <input
              type="password"
              placeholder="Enter password... "
              className="w-full border border-gray-300 rounded h-10 "
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {passwordError && <p className="text-red-500">{passwordError}</p>}
            <div className="mb-6 flex items-center justify-between"></div>
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

export default AddUser;
