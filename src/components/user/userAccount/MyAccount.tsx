import React, { ChangeEvent, useEffect, useState, useRef } from "react";
import { CiCamera } from "react-icons/ci";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import defaultImage from "../../../assets/login.jpg";
import { RotatingLines } from "react-loader-spinner";
import * as Yup from "yup";
import {
  handleGetPremiumPackages,
  updateUserInfo,
} from "../../services/api/userApi";
import PremiumAccountPay from "./premiumAccount/PremiumAccountPay";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

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
  premiumAccount: boolean;
  __v: number;
  avatar?: {
    url: string;
    public_id: string;
  };
}
interface PremiumPackage {
  _id?: string;
  title: String;
  description: String;
  price: Number;
}

const MyAccount: React.FC = () => {
  const storedUserData = useSelector((state: any) => state.login.user);
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [_id, set_Id] = useState<string>("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [premiumPackages, setPremiumPackages] = useState<PremiumPackage[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [selectedPrice, setSelectedPrice] = useState<number>();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(storedUserData);

    if (storedUserData === null) {
      navigate("/");
    } else {
      setUser(storedUserData);
      setName(storedUserData.name);
      setEmail(storedUserData.email);
      set_Id(storedUserData._id);
      setMessage("");
    }
  }, [storedUserData]);

  const getPremiumPackages = async () => {
    try {
      const response = await handleGetPremiumPackages();
      if (response?.data.success) {
        setPremiumPackages(response.data.premiumOffers);
      }
    } catch (error) {
      console.error("Error fetching premium packages:", error);
    }
  };

  useEffect(() => {
    getPremiumPackages();
  }, []);

  const handleCameraIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      TransformFile(file);
    }
  };

  const TransformFile = (file: File) => {
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
    name: Yup.string().required("Name is required"),
    email: Yup.string().email().required("Email is required"),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("");
    const avatarToSend = avatar || "";
    try {
      await validationSchema.validate({ name, email }, { abortEarly: false });

      const res = await updateUserInfo(_id, name, email, avatarToSend);

      if (res?.data.user.success) {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setMessage(res.data.message);
      }
    } catch (error: any) {
      const newError: { [key: string]: string } = {};

      error.inner.forEach((err: any) => {
        newError[err.path] = err.message;
      });
      setErrors(newError);
    }
  };

  console.log(errors);

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center mt-8 "
      >
        <div className="relative w-28 h-28 rounded-full border border-green-500">
          <img
            src={
              avatarPreview ? avatarPreview : user?.avatar?.url || defaultImage
            }
            alt="Profile Pic"
            className="w-full h-full object-cover rounded-full"
          />

          <div
            className="absolute inset-0 flex justify-center items-end cursor-pointer"
            onClick={handleCameraIconClick}
          >
            <CiCamera size={25} color="blue" fill="blue" />
          </div>
        </div>
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <label htmlFor="name" className="text-lg font-bold text-left mt-10">
          Full Name
        </label>
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

      <div className="absolute top-0 right-0 m-4 flex items-center gap-2">
        {user?.premiumAccount ? (
          <div className="flex items-center px-4 py-2 text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text font-bold border border-yellow-400 rounded-md shadow-md">
            <MdOutlineWorkspacePremium size={25} className="text-yellow-500" />
            <span>Premium Account</span>
          </div>
        ) : (
          <div className="relative">
            <button
              className="flex items-center justify-center w-[10vw] px-4 py-2 text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text font-bold border border-yellow-400 rounded-md shadow-md hover:shadow-lg transition-shadow"
              onClick={() => setIsOpen(true)}
            >
              Buy Premium
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-2 w-[10vw] border border-gray-200 bg-white rounded-md shadow-lg z-50">
                {premiumPackages.map((item, index) => (
                  <button
                    key={index}
                    className="flex items-center justify-center w-full px-4 py-2 text-transparent bg-gradient-to-r from-green-300 to-yellow-600 bg-clip-text font-bold border border-yellow-400 rounded-md shadow-md hover:shadow-lg transition-shadow mt-2 mb-2"
                    onClick={() => {
                      setOpen(true);
                      setSelectedPrice(Number(item?.price));
                      setIsOpen(false);
                    }}
                  >
                    {item.title} ₹{item.price.toString()}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {open && (
        <PremiumAccountPay
          open={open}
          setOpen={setOpen}
          price={selectedPrice || 0}
        />
      )}
    </div>
  );
};

export default MyAccount;
