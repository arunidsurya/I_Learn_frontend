import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { app } from "../../../firebase";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SaveUser } from "../../../app/features/loginSlice";

const Oauth: React.FC = () => {
  const [name, setName] = useState<string | null>("");
  const [email, setEmail] = useState<string | null>("");
  const [avatar, setAvatar] = useState<string | null>("");

  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = getAuth(app);

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      setName(resultsFromGoogle.user.displayName);
      setEmail(resultsFromGoogle.user.email);
      setAvatar(resultsFromGoogle.user.photoURL);
      axios
        .post(
          "http://localhost:5000/api/v1/user/google_signin",
          { name, email, avatar },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          console.log(response.data);
          if (response.data.data.success) {
            // console.log(response.data.data.user);

            const userDetails = response.data.data.user;
            dispatch(SaveUser(userDetails));
            localStorage.setItem("user", JSON.stringify(response.data.data));
            localStorage.setItem("accessToken", response.data.data.token);
            Navigate("/");
            window.location.reload();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleGoogleClick}
        className="rounded text-black-500 px-7 pb-2.5 pt-3 text-sm font-medium  border border-gray-500   flex mt-2 items-center justify-center hover:bg-blue-500 "
      >
        <FcGoogle size={30} className="mr-2" />
        <span>Continue with Google</span>
      </button>
    </div>
  );
};

export default Oauth;
