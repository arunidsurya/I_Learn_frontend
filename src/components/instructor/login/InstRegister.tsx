import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TERipple } from "tw-elements-react";
import Header from "../../user/shared/Header";
import Footer from "../../user/shared/Footer";
import { handleRegister } from "../../services/api/tutorApi";

const InstRegister: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [institute, setInstitute] = useState<string>("");
  const [qualifiaction, setQualification] = useState<string>("");
  const [experience, setExperience] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [error, setError] = useState<string>("");
  const Navigate = useNavigate();

  useEffect(() => {
    const tutorAuth = localStorage.getItem("tutor_accessToken");

    if (tutorAuth) {
      Navigate("/instructor");
    }
  }, []);

  const handleSignUp = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    setPasswordError("");

    const res = await handleRegister(name, email, gender, password, institute, qualifiaction, experience );
            if (res?.data.success) {
              setError("");
              Navigate("/inst_login/");
            } else {
              setError(res?.data.message);
            }
  };

  return (
    <section>
      <Header />
      <div className="h-full my-10 mx-20">
        {/* <!-- Left column container with background--> */}
        <div className="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
          <div className="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:w-9/12 md:shrink-0 lg:w-6/12 xl:w-6/12">
            <img
              src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw1.webp"
              className="w-full"
              alt="Sample image"
            />
          </div>

          {/* <!-- Right column container --> */}
          <div className="mb-12 md:mb-0 md:w-8/12 lg:w-5/12 xl:w-5/12">
            <form onSubmit={handleSignUp}>
              {/* <!--Sign in section--> */}
              <div className="flex flex-row items-center gap-4 justify-center lg:justify-start">
                <p className="mb-0 mr-4 ml-52 text-3xl font-bold text-center">
                  Instructor Registration
                </p>
              </div>

              {/* <!-- Separator between social media sign in and email/password sign in --> */}
              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold dark:text-white"></p>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              {/* <!-- Email input --> */}
              {/* <TEInput
                type="email"
                label="Email address"
                size="lg"
                className="mb-6"
              ></TEInput> */}
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

                <label htmlFor="institute">Institute</label>
                <input
                  type="text"
                  placeholder="Enter Instutute... "
                  className="w-full border border-gray-300 rounded h-10 "
                  onChange={(e) => setInstitute(e.target.value)}
                />

                <label htmlFor="institute">Qualifiacation</label>
                <input
                  type="text"
                  placeholder="Enter Qualification... "
                  className="w-full border border-gray-300 rounded h-10 "
                  onChange={(e) => setQualification(e.target.value)}
                />

                <label htmlFor="experience">Experience</label>
                <input
                  type="text"
                  placeholder="Enter experience in years... "
                  className="w-full border border-gray-300 rounded h-10 "
                  onChange={(e) => setExperience(e.target.value)}
                />

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
                {passwordError && (
                  <p className="text-red-500">{passwordError}</p>
                )}
                <div className="mb-6 flex items-center justify-between">
                  {/* <!-- Remember me checkbox --> */}
                  <div className="mb-0.125rem block min-h-1.5rem pl-1.5rem">
                    <input
                      className="relative float-left -ml-1.5rem mr-6px mt-0.15rem h-1.125rem w-1.125rem appearance-none rounded-0.25rem border-0.125rem border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-0.875rem before:w-0.875rem before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-0px_0px_0px_13px_transparent before:content-'' checked:border-primary checked:bg-primary checked:before:opacity-0.16 checked:after:absolute checked:after:-mt-px checked:after:ml-0.25rem checked:after:block checked:after:h-0.8125rem checked:after:w-0.375rem checked:after:rotate-45 checked:after:border-0.125rem checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-'' hover:cursor-pointer hover:before:opacity-0.04 hover:before:shadow-0px_0px_0px_13px_rgba(0,0,0,0.6) focus:shadow-none focus:transition-border-color_0.2s focus:before:scale-100 focus:before:opacity-0.12 focus:before:shadow-0px_0px_0px_13px_rgba(0,0,0,0.6) focus:before:transition-box-shadow_0.2s,transform_0.2s focus:after:absolute focus:after:z-1 focus:after:block focus:after:h-0.875rem focus:after:w-0.875rem focus:after:rounded-0.125rem focus:after:content-'' checked:focus:before:scale-100 checked:focus:before:shadow-0px_0px_0px_13px_#3b71ca checked:focus:before:transition-box-shadow_0.2s,transform_0.2s checked:focus:after:-mt-px checked:focus:after:ml-0.25rem checked:focus:after:h-0.8125rem checked:focus:after:w-0.375rem checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-0.125rem checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-0px_0px_0px_13px_rgba(255,255,255,0.4) dark:checked:focus:before:shadow-0px_0px_0px_13px_#3b71ca"
                      type="checkbox"
                      value=""
                      id="exampleCheck2"
                    />
                    <label
                      className="inline-block pl-0.15rem hover:cursor-pointer"
                      htmlFor="exampleCheck2"
                    >
                      Terms & conitions
                    </label>
                  </div>
                </div>
              </div>
              {/* <!--Password input--> */}
              {/* <TEInput
                type="password"
                label="Password"
                className="mb-6"
                size="lg"
              ></TEInput> */}

              {/* <!-- Login button --> */}
              <div className="text-center lg:text-left">
                <TERipple rippleColor="light">
                  <button
                    type="submit"
                    className="inline-block rounded bg-blue-500 px-7 pb-2.5 pt-3 text-sm font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    Register
                  </button>
                </TERipple>

                {/* <!-- Register link --> */}
                <p className="mb-0 mt-2 pt-1 text-sm font-semibold">
                  Have an account?{" "}
                  <Link
                    to={"/inst_login"}
                    className="text-red-500 underline underline-offset-1 transition duration-150 ease-in-out hover:text-danger-600 focus:text-danger-600 active:text-danger-700"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default InstRegister;
