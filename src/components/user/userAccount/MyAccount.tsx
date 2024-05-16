import React, { ChangeEvent, useEffect, useState, useRef } from "react";
import { CiCamera } from "react-icons/ci";
import defaultImage from "../../../assets/login.jpg";
import { RotatingLines } from "react-loader-spinner";
import * as Yup from "yup";
import { updateUserInfo } from "../../services/api/userApi";


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
  avatar?: {
    url: string;
    public_id: string;
  };
}

const MyAccount: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [_id, set_Id] = useState<string>("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string>("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

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


  const handleCameraIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger click event of the hidden file input
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      TransformFIle(file);
    }
  };

  const TransformFIle = (file: File) => {
    const reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
        setAvatar(reader.result as string);
      };
    } else {
      setAvatarPreview("");
      setAvatar("");
    }
  };



  const validationSchema = Yup.object({
    name:Yup.string().required("Name is required"),
    email:Yup.string().email().required("Email is required")
  })


  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    // console.log(avatar);
    const avatarToSend = avatar || "";
    try {
      await validationSchema.validate({name,email},{abortEarly:false});

      const res = await updateUserInfo(_id, name, email, avatarToSend);

          if (res?.data.user.success) {
            localStorage.setItem("user", JSON.stringify(res.data.user));
            setMessage(res.data.message);
          }
    } catch (error:any) {
            const newError: { [key: string]: string } = {};

            // console.log(error.inner);

            error.inner.forEach((err: any) => {
              newError[err.path] = err.message;
            });
            setErrors(newError);
      
    }

  };
  console.log(errors);
  

  // console.log("avatarPreview:", avatarPreview);
  // console.log("user?.avatar.url:", user?.avatar?.url);
  // console.log("defaultImage:", defaultImage);
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center mt-8"
      >
        <div className="relative w-28 h-28 rounded-full border border-green-500 ">
          <img
            src={
              avatarPreview ? avatarPreview : user?.avatar?.url || defaultImage
            }
            alt="Profile Pic"
            className="w-full h-full object-cover rounded-full"
          />

          <div
            className="absolute inset-0 flex justify-center place-items-end cursor-pointer"
            onClick={handleCameraIconClick}
          >
            <CiCamera size={25} />
          </div>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        {/* {message && <p className="text-green-500">{message}</p>} */}
        <label htmlFor="name" className="text-lg font-bold text-left mt-10">
          Full Name
        </label>{" "}
        {errors.name && (
          <div>
            <p className="text-red-500">*{errors.name}</p>
          </div>
        )}
        <input
          type="text"
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
          className="rounded-md border border-gray-400 w-2/6 h-10"
        />
        <label htmlFor="email" className="text-lg font-bold">
          Email Address
        </label>
        {errors.email && (
          <div>
            <p className="text-red-500">*{errors.email}</p>
          </div>
        )}
        <input
          type="email"
          name="email"
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
