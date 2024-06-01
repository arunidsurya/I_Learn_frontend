import React, { useState } from "react";
import { handleLogin } from "../../services/api/userApi";
import { useDispatch } from "react-redux";
import { SaveUser } from "../../../redux/features/loginSlice";
import { useLocation, useNavigate } from "react-router-dom";

const NewLogin = () => {

  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState<{ email: string; password: string }>({
    email: "",
    password: "",
  });

  const handleChange = (data: any) => {
    setForm({
      ...form,
      [data.name]: data.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await handleLogin(form.email,form.password)
            if (response?.data.data.success) {
              const userDetails = response.data.data.user;
              console.log(userDetails);
              dispatch(SaveUser(userDetails));
              localStorage.setItem("user", JSON.stringify(response.data.data));
              localStorage.setItem(
                "accessToken",
                response.data.data.access_token
              );
              const { from } = location.state || {
                from: { pathname: "/" },
              };
              navigate(from);
              window.location.reload();
            } 
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="ml-10 mt-10">
        <label htmlFor="">name</label>
        <input
          type="text"
          className="border border-gray-500"
          name="email"
          value={form.email}
          onChange={(e: any) => handleChange(e.target)}
        />
        <label className="ml-10" htmlFor="">
          password
        </label>
        <input
          type="text"
          className="border border-gray-500 "
          value={form.password}
          name="password"
          onChange={(e: any) => handleChange(e.target)}
        />
        <button
          className="bg-green-500 text-white ml-10 w-[80px] h-[30px]"
          type="submit"
        >
          login
        </button>
      </form>
    </div>
  );
};

export default NewLogin;
