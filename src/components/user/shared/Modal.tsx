import axios from "axios";
import React, { useRef, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState<string>("");
  const modalRef = useRef<HTMLDivElement>(null); // Specify the type of ref

  const navigate = useNavigate();

  const closeModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("email :", email);

    axios
      .post(
        "http://localhost:5000/api/v1/user/forgot_password_otp",
        { email },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);

        if (res.data.success) {
          localStorage.setItem("email", res.data.email);
          const activationToken = res.data.activationToken;
          navigate("/account_verify", { state: { activationToken } });
        }
      });
  };

  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center"
    >
      <div className="mt-10 flex flex-col gap-5 text-white">
        <button
          className="place-self-end bg-red-500 rounded-sm"
          onClick={onClose}
        >
          <IoCloseSharp size={30} />
        </button>
        <div className="bg-indigo-600 rounded-xl px-20 py-10 flex flex-col gap05 items-center mx-4">
          <h1 className="text-3xl font-extrabold">Enter your email</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="email address"
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 text-black border-gray-300 rounded-md "
            />
            <button
              type="submit"
              className="mt-4  w-full items-center justify-center px-5 py-3 font-medium rounded-md bg-green-500"
            >
              submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
