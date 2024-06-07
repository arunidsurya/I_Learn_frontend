import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { CiCamera } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import defaultImage from "../../../assets/user.jpeg";
import * as Yup from "yup";
import { saveAdmin } from "../../../redux/features/loginSlice";
import toast from "react-hot-toast";
import ChangePassword from "./ChangePassword";
import { updateAdminInfo } from "../../services/api/adminApi";

interface Admin {
  _id?: string;
  name: string;
  email: string;
  gender: string;
  password: string;
  avatar?: {
    url: string;
    public_id: string;
  };
  isVerified: boolean;
  comparePassword: (password: string) => Promise<boolean>;
}

const ManageAccount: React.FC = () => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [_id, set_id] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const dispatch = useDispatch();

  const storedAdminData = useSelector((state: any) => state.login.admin);
  useEffect(() => {
    if (storedAdminData) {
      setAdmin(storedAdminData);
      set_id(storedAdminData._id);
      setName(storedAdminData.name);
      setEmail(storedAdminData.email);
    }
  }, [storedAdminData]);

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
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("called");
    

    try {
      await validationSchema.validate(
        { name},
        { abortEarly: false }
      );

      const res = await updateAdminInfo(_id, name, avatar);

      if (res?.data.admin.success) {
        localStorage.setItem("tutor", JSON.stringify(res.data.admin.admin));
        dispatch(saveAdmin(res.data.admin.admin));
        toast.success(res.data.admin.message);
      }
    } catch (error: any) {
      const newError: { [key: string]: string } = {};

      error.inner.forEach((err: any) => {
        newError[err.path] = err.message;
      });
      setErrors(newError);
    }
  };

  return (
    <div className="relative">
      {!isOpen && (
        <>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 items-center mt-8 "
          >
            <div className="relative w-28 h-28 rounded-full border border-green-500">
              <img
                src={
                  avatarPreview
                    ? avatarPreview
                    : admin?.avatar?.url || defaultImage
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
            <label htmlFor="email" className="text-lg font-bold">
              Email Address
            </label>
            <h1 className="text-[1.2rem]">{email}</h1>
            <div className="w-2/6 mt-10">
              <label htmlFor="name" className="text-lg font-bold text-left">
                Full Name
              </label>
              <div className="flex items-center mt-2">
                <input
                  type="text"
                  value={name}
                  name="name"
                  onChange={(e) => setName(e.target.value)}
                  className="rounded-md border border-gray-400 w-full p-2 h-10 mr-2"
                />
                <button
                  type="submit"
                  className="bg-blue-800 rounded-md text-white border border-gray-400 h-10 p-2"
                >
                  Update
                </button>
              </div>
              {errors.name && (
                <p className="text-red-500 mt-2">*{errors.name}</p>
              )}
            </div>
          </form>

          <div className="flex justify-center items-center text-center mt-10">
            <button
              className=" text-red-500 underline underline-offset-1"
              onClick={() => setIsOpen(true)}
            >
              Update Profile Password
            </button>
          </div>
        </>
      )}

      {isOpen && <ChangePassword setIsOpen={setIsOpen} />}
    </div>
  );
};

export default ManageAccount;
