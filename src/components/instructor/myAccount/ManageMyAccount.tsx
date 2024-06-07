import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { CiCamera } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import defaultImage from "../../../assets/user.jpeg";
import * as Yup from "yup";
import { updateTutorInfo } from "../../services/api/tutorApi";
import { saveTutor } from "../../../redux/features/loginSlice";
import toast from "react-hot-toast";

interface Tutor {
  _id?: string;
  name: string;
  email: string;
  gender: string;
  institute: string;
  qualifiaction: string;
  experience: string;
  password: string;
  avatar?: {
    url: string;
    public_id: string;
  };
  isVerified?: boolean;
  isBolcked?: boolean;
  comparePassword: (password: string) => Promise<boolean>;
  SignAccessToken: () => string;
  SignRefreshToken: () => string;
}

const ManageMyAccount: React.FC = () => {
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [_id, set_id] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [institute, setInstitute] = useState<string>("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const dispatch = useDispatch();

  const storedTutor = useSelector((state: any) => state.login.tutor);
  useEffect(() => {
    if (storedTutor) {
      setTutor(storedTutor);
      set_id(storedTutor._id);
      setName(storedTutor.name);
      setEmail(storedTutor.email);
      setInstitute(storedTutor.institute);
    }
  }, [storedTutor]);

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
    institute: Yup.string().required("institute name is required"),
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const avatarToSend = avatar || "";
    try {
      await validationSchema.validate({ name, institute }, { abortEarly: false });

      const res = await updateTutorInfo(_id, name, institute, avatarToSend);

      if (res?.data.tutor.success) {
        localStorage.setItem("tutor", JSON.stringify(res.data.tutor.tutor));
        dispatch(saveTutor(res.data.tutor.tutor)); 
        toast.success(res.data.tutor.message)
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
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-center mt-8 "
      >
        <div className="relative w-28 h-28 rounded-full border border-green-500">
          <img
            src={
              avatarPreview ? avatarPreview : tutor?.avatar?.url || defaultImage
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
        <label htmlFor="name" className="text-lg font-bold text-left mt-10">
          Institute Name
        </label>
        {errors.institute && (
          <div>
            <p className="text-red-500">*{errors.institute}</p>
          </div>
        )}
        <input
          type="text"
          value={institute}
          name="name"
          onChange={(e) => setInstitute(e.target.value)}
          className="rounded-md border border-gray-400 w-2/6 h-10"
        />

        <button type="submit" className="bg-blue-800 rounded-md text-white border border-gray-400 w-2/6 h-10 mt-4">
          Update
        </button>
      </form>
    </div>
  );
};

export default ManageMyAccount;
