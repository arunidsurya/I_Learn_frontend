import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation} from "react-router-dom";
import { handleforgotPasswordApprove, handleforgotPasswordConfirm } from "../../services/api/userApi";

const ConfirmEmail: React.FC = () => {
  const location = useLocation();
  const activation_token = location.state.activationToken;

  const [otp, setOtp] = useState<string>("");
  const [error, setError] = useState("");
  const [isSuccess, setSuccess] = useState(false);
  const [otpSuccess, setOtpSuccess] = useState(false);
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    const activation_code= otp;

    const res = await handleforgotPasswordApprove(activation_code, activation_token,)
            if (res?.data.success) {
              setOtpSuccess(true);
            }

  };

  const handleChangePassword = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = localStorage.getItem("email") || "";
    if (newPassword !== confirmPassword) {
      setPasswordError("Passwords are not matching");
      return;
    }else if(newPassword.length === 0){
      setPasswordError("password field is empty!!");
    }
    setPasswordError("");

    const res = await handleforgotPasswordConfirm(email,newPassword);
            if (res?.data.success) {
              setSuccess(true);
              localStorage.removeItem("email");
            }

  };
  return (
    <>
      {isSuccess ? (
        <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
          <header className="mb-8">
            <h1 className="text-2xl font-bold mb-1">Account Verification</h1>
            <p className="text-xl text-amber-500">
              Password changed successfully!!. Please click here to
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
        <>
          {otpSuccess ? (
            <>
              <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow mt-32">
                <header className="mb-8">
                  {passwordError && (
                    <p className="text-red-500">{passwordError}</p>
                  )}
                  <form
                    onSubmit={handleChangePassword}
                    className="flex flex-col gap-4"
                  >
                    <label
                      htmlFor="password"
                      className="font-bold flex items-start"
                    >
                      New Password
                    </label>
                    <input
                      type="text"
                      className="border border-gray-500 py-4 rounded-md h-10"
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <label
                      htmlFor="password"
                      className="font-bold flex items-start"
                    >
                      confirm Password
                    </label>
                    <input
                      type="password"
                      className="border border-gray-500 py-4 rounded-md h-10"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                      type="submit"
                      className="bg-green-500 h-10 border-gray-500 rounded-md"
                    >
                      submit
                    </button>
                  </form>
                </header>
              </div>
            </>
          ) : (
            <div className="max-w-md mx-auto text-center bg-white px-4 sm:px-8 py-10 rounded-xl shadow">
              <header className="mb-8">
                <h1 className="text-2xl font-bold mb-1">
                  Account Verification
                </h1>
                <p className="text-[15px] text-slate-500">
                  Enter the 4-digit verification code that was sent to your
                  Email.
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
                    submit
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
      )}
    </>
  );
};

export default ConfirmEmail;
