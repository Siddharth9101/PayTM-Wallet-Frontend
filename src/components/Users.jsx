import React, { useEffect, useState } from "react";
import Button from "./Button";
import InputBox from "./InputBox";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const decoded = jwtDecode(localStorage.getItem("token"));
    const currentUser = decoded.userId;
    try {
      axios
        .get(
          import.meta.env.VITE_BACKEND_URL +
            "/api/v1/user/bulk?filter=" +
            filter
        )
        .then((res) => {
          const newList = res.data.users.filter(
            (user) => user.id != currentUser
          );
          setUsers(newList);
        });
    } catch (error) {
      console.log(error);
    }
  }, [filter]);

  return (
    <div className="flex flex-col gap-1 px-12">
      <div className="text-lg font-bold py-2">Users</div>
      <div>
        <InputBox
          onChange={(e) => setFilter(e.target.value)}
          placeholder={"Search users..."}
        />
      </div>
      <div>
        {users.map((user) => (
          <User key={user.id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default Users;

const User = ({ user }) => {
  const navigate = useNavigate();
  return (
    <div className="my-2 flex justify-between item-center">
      <div className="flex justify-center items-center gap-2">
        <div className="w-10 h-10 bg-slate-200 rounded-full flex justify-center items-center text-lg font-medium">
          {user.firstname[0]}
        </div>
        <div className="flex items-center text-base font-medium">
          {user.firstname} {user.lastname}
        </div>
      </div>
      <div className="py-1">
        <Button
          color={"bg-slate-800"}
          hover={"bg-slate-900"}
          onClick={() => {
            navigate("/send?id=" + user.id + "&name=" + user.firstname);
          }}
          label={"Send Money"}
        />
      </div>
    </div>
  );
};
