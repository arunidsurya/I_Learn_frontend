import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { app } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SaveUser } from "../../../redux/features/loginSlice";
import { handleGoogleSignIn } from "../../services/api/userApi";


const Oauth: React.FC= () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = getAuth(app);

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });

    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      // console.log("Gname :", resultsFromGoogle.user.displayName);
      // console.log("Gemail :", resultsFromGoogle.user.email);
      // console.log("Gphoto :", resultsFromGoogle.user.photoURL);

      if (
        resultsFromGoogle.user.displayName &&
        resultsFromGoogle.user.email &&
        resultsFromGoogle.user.photoURL
      ) {

                      const name= resultsFromGoogle.user.displayName;
              const email = resultsFromGoogle.user.email;
             const  avatar = resultsFromGoogle.user.photoURL ;

             const response = await handleGoogleSignIn(name,email,avatar);
                         if (response?.data.data.success) {
                           // console.log(response.data.data.user);s

                           const userDetails = response.data.data.user;
                           // console.log(userDetails);
                           dispatch(SaveUser(userDetails));
                           localStorage.setItem(
                             "user",
                             JSON.stringify(response.data.data)
                           );
                           localStorage.setItem(
                             "accessToken",
                             response.data.data.access_token
                           );
                           Navigate("/");
                           window.location.reload();
                         }
      //   axios
      //     .post(
      //       "http://localhost:5000/api/v1/user/google_signin",
      //       {
      //         name: resultsFromGoogle.user.displayName,
      //         email: resultsFromGoogle.user.email,
      //         avatar: resultsFromGoogle.user.photoURL,
      //       },
      //       {
      //         withCredentials: true,
      //       }
      //     )
      //     .then((response) => {
      //       // console.log(response.data);
      //       if (response.data.data.success) {
      //         // console.log(response.data.data.user);s

      //         const userDetails = response.data.data.user;
      //         // console.log(userDetails);
      //         dispatch(SaveUser(userDetails));
      //         localStorage.setItem("user", JSON.stringify(response.data.data));
      //         localStorage.setItem(
      //           "accessToken",
      //           response.data.data.access_token
      //         );
      //         Navigate("/");
      //         window.location.reload();
      //       }
      //     })
      //     .catch((error) => {
      //       console.log(error);
      //       setError("internal sever errror,please try again");
      //     });
      // } else {
      //   console.log("error");
      //   setError("internal sever errror,please try again");
      }
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
