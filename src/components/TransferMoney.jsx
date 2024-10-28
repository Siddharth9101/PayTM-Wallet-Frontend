import Heading from "../components/Heading";
import InputBox from "./InputBox";
import Button from "./Button";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const TransferMoney = ({ name, id }) => {
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();
  return (
    <div className="px-8 pb-10 pt-4 bg-white rounded-lg shadow-lg w-96">
      {/* Heading Comp */}
      <div className="mb-10 text-center">
        <Heading label={"Send Money"} />
      </div>
      {/* Avatar with name */}
      <div>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-green-500 text-white rounded-full flex justify-center items-center text-lg font-medium">
            {name[0].toUpperCase()}
          </div>
          <div className="flex items-center text-base font-medium">{name}</div>
        </div>
      </div>
      {/* InputBox */}
      <InputBox
        placeholder={"Enter amount"}
        onChange={(e) => setAmount(e.target.value)}
      />
      {/* Button */}
      <div className="mt-4">
        <Button
          label={"Initiate Transfer"}
          color={"bg-green-500"}
          hover={"bg-green-600"}
          onClick={async () => {
            try {
              const responce = await axios.post(
                import.meta.env.VITE_BACKEND_URL + "/api/v1/account/transfer",
                {
                  to: id,
                  amount,
                },
                {
                  headers: {
                    Authorization: "Bearer " + localStorage.getItem("token"),
                  },
                }
              );
              setAmount("");
              toast.success(responce.data.message);
              setTimeout(() => {
                navigate("/dashboard");
              }, 2000);
            } catch (error) {
              console.log(error);
              setAmount("");
              toast.error(error.response.data.message);
              setTimeout(() => {
                navigate("/dashboard");
              }, timeout);
            }
          }}
        />
      </div>
    </div>
  );
};

export default TransferMoney;
