import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Appbar = () => {
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/v1/user/me", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        const userInfo = res.data.user;
        setUser(userInfo.firstname);
      });
  }, []);
  return (
    <div className="flex h-14 justify-between items-center py-1 px-12 shadow">
      <div className="font-medium">PatTM App</div>
      <div className="flex items-center gap-2">
        <div className="font-medium">Hello, {user}</div>
        <div className="bg-slate-200 rounded-full hidden w-10 h-10 sm:flex justify-center items-center text-sm">
          {user[0]}
        </div>
        <div>
          <Button
            label={"Logout"}
            color={"bg-slate-800"}
            hover={"bg-slate-900"}
            onClick={() => {
              localStorage.removeItem("token");
              toast.success("Logging out");
              setTimeout(() => {
                navigate("/signin");
              }, 2000);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Appbar;
