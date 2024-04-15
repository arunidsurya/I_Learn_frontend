import React, { ChangeEvent, useEffect, useState, useRef } from "react";
import { CiCamera } from "react-icons/ci";
import defaultImage from "../../../assets/profile.png";
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";
import { CgPassword } from "react-icons/cg";

interface User {
  _id: string;
  name: string;
  email: string;
  gender: string;
  password: string;
  isVerified: boolean;
  isBlocked: boolean;
  courses: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const MyAccount: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [_id, set_Id] = useState<string>("");
  const [avatar, setAvatar] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const storedUserData = localStorage.getItem("user");
    // console.log("user", storedUserData);
    if (storedUserData) {
      const parseData = JSON.parse(storedUserData);
      const currentUser: User = parseData.user;
      console.log(currentUser);
      setUser(currentUser);
      setName(currentUser.name);
      setEmail(currentUser.email);
      set_Id(currentUser._id);
      setMessage("");
      // console.log(currentUser.name, currentUser.email);
    }
  }, []);

  // const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   setName(event.target.value);
  // };

  // const handleCameraIconClick = () => {
  //   if (fileInputRef.current) {
  //     fileInputRef.current.click(); // Trigger click event of the hidden file input
  //   }
  // };

  // const uploadFile = async () => {
  //   if (!avatar) return;
  //   const data = new FormData();
  //   data.append("file", avatar);
  //   data.append("upload_preset", "images_preset");

  //   try {
  //     const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  //     console.log(cloudName);

  //     let resourceType = "image";
  //     let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
  //     const res = await axios.post(api, data);
  //     const { secure_url } = res.data;
  //     console.log(secure_url);
  //     return secure_url;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   try {
  //     setLoading(true);
  //     const imgUrl = await uploadFile();
  //     // await axios.post(`url`,{name,imgUrl})

  //     //Reset states
  //     setAvatar(null);
  //     console.log("File upload success!");
  //     setLoading(false);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    axios
      .put(
        "http://localhost:5000/api/v1/user/update_user_info",
        { _id, name, email },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        // console.log(res.data.user.success);
        if (res.data.user.success) {
          localStorage.setItem("user", JSON.stringify(res.data.user));
          setMessage(res.data.message);
        }
      });
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center mt-8"
      >
        <div className="relative w-28 h-28 rounded-full">
          <img
            src={avatar || defaultImage}
            alt="Avatar"
            className="w-full h-full object-cover rounded-full"
          />
          <div
            className="absolute inset-0 flex justify-center place-items-end cursor-pointer"
            // onClick={handleCameraIconClick}
          >
            <CiCamera size={25} />
          </div>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files?.[0] || null)}
          className="hidden"
        />
        {/* {message && <p className="text-green-500">{message}</p>} */}
        <label htmlFor="name" className="text-lg font-bold text-left mt-10">
          Full Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-md border border-gray-400 w-2/6 h-10"
        />
        <label htmlFor="email" className="text-lg font-bold">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          className="rounded-md border border-gray-400 w-2/6 h-10"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="bg-blue-800 rounded-md text-white border border-gray-400 w-2/6 h-10 mt-4">
          Update
        </button>
      </form>

      {loading && (
        <div className="flex items-center justify-center h-full mt-5">
          <RotatingLines visible={true} />
        </div>
      )}
    </div>
  );
};

export default MyAccount;
