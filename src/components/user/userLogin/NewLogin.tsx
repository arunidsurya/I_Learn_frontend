import React, { useState } from "react";
import { handleLogin, login } from "../../services/api/userApi";
import axios from "axios";

const NewLogin = () => {
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
      console.log(response?.data);
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
