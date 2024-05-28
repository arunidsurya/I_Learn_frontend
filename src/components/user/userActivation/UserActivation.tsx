import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const UserActivation: React.FC = () => {
  const location = useLocation();
  const activation_token = location.state;

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isSuccess, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    axios
      .post(
        "http://localhost:5000/api/v1/user/activate-user",
        {
          activation_code: otp,
          activation_token: activation_token,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        // console.log(res.data);

        if (res.data.user.success) {
          setSuccess(true);
        } else {
          setError(res.data.user.message);
        }
      })
      .catch((error: any) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      {isSuccess ? (
        <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
          <header className="mb-8">
            <h1 className="text-2xl font-bold mb-1">Account Verification</h1>
            <p className="text-xl text-amber-500">
              Congradulations!! Account verification successful!!. Please click
              here to
              <Link
                className="text-green-500 underline underline-offset-1 "
                to={"/login"}
              >
                login
              </Link>
            </p>
          </header>
        </div>
      ) : (
        <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
          <header className="mb-8">
            <h1 className="text-2xl font-bold mb-1">Account Verification</h1>
            <p className="text-[15px] text-slate-500">
              Enter the 4-digit verification code that was sent to your Email.
            </p>
          </header>
          {error && <p className="text-red-500">{error}</p>}
          <form id="otp-form" onSubmit={handleSubmit}>
            <div className="flex items-center justify-center gap-3">
              <input
                type="text"
                className="w-full h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                pattern="\d*"
                maxLength={4}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <div className="max-w-[260px] mx-auto mt-4">
              <button
                type="submit"
                className="w-full inline-flex justify-center whitespace-nowrap rounded-lg bg-indigo-500 px-3.5 py-2.5 text-sm font-medium text-white shadow-sm shadow-indigo-950/10 hover:bg-indigo-600 focus:outline-none focus:ring focus:ring-indigo-300 focus-visible:outline-none focus-visible:ring focus-visible:ring-indigo-300 transition-colors duration-150"
              >
                Verify Account
              </button>
            </div>
          </form>
          <div className="text-sm text-slate-500 mt-4">
            Didn't receive code?{" "}
            <a
              className="font-medium text-indigo-500 hover:text-indigo-600"
              href="#0"
            >
              Resend
            </a>
          </div>
        </div>
      )}
    </>
  );
};

export default UserActivation;
