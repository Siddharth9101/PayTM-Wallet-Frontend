import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  return (
    <div className="w-full h-screen bg-slate-300 flex justify-center items-center">
      <div className="flex flex-col justify-center p-2">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            label={"Email"}
            placeholder={"johndoe@gmail.com"}
            value={formData.username}
          />
          <InputBox
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            label={"Password"}
            placeholder={"123456"}
            value={formData.password}
          />
          <div className="pt-3">
            <Button
              label={"Sign in"}
              color={"bg-slate-800"}
              hover={"bg-slate-900"}
              onClick={async () => {
                console.log(formData);
                try {
                  const res = await axios.post(
                    import.meta.env.VITE_BACKEND_URL + "/api/v1/user/signin",
                    formData
                  );
                  localStorage.setItem("token", res.data.token);
                  setFormData({
                    username: "",
                    password: "",
                  });
                  toast.success(res.data.message);
                  setTimeout(() => {
                    navigate("/dashboard");
                  }, 2000);
                } catch (error) {
                  console.log(error.response.data.message);
                  setFormData({
                    username: "",
                    password: "",
                  });
                  toast.error(error.response.data.message);
                }
              }}
            />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
