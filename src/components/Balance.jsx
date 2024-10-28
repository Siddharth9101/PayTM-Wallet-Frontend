import axios from "axios";
import React, { useEffect, useState } from "react";

const Balance = () => {
  const [bal, setBal] = useState(0);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/v1/account/balance", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setBal(res.data.balance.toFixed(2));
        console.log(res);
      });
  }, []);
  return (
    <div className="h-14 flex items-center px-12">
      <div className="flex gap-3">
        <div className="font-bold text-lg">Your Balance</div>
        <div className="font-medium text-lg">Rs {bal}</div>
      </div>
    </div>
  );
};

export default Balance;
