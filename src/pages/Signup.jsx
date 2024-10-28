import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import Button from "../components/Button";
import BottomWarning from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
const Signup = () => {
  const [inputs, setInputs] = useState({
    firstname: "",
    lastname: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const signupUser = async () => {
    try {
      const responce = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/v1/user/signup",
        inputs
      );
      setInputs({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
      });
      localStorage.setItem("token", responce.data.token);
      toast.success(res.data.message);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.log(error.response.data.message);
      setInputs({
        firstname: "",
        lastname: "",
        username: "",
        password: "",
      });
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="w-full h-screen bg-slate-300 flex justify-center items-center">
      <div className="flex flex-col justify-center p-2">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading
            label={"Enter your information to create your acccount"}
          />
          <InputBox
            value={inputs.firstname}
            onChange={(e) => {
              setInputs({ ...inputs, firstname: e.target.value });
            }}
            label={"First Name"}
            placeholder={"John"}
          />
          <InputBox
            value={inputs.lastname}
            onChange={(e) => {
              setInputs({ ...inputs, lastname: e.target.value });
            }}
            label={"Last Name"}
            placeholder={"Doe"}
          />
          <InputBox
            value={inputs.username}
            onChange={(e) => {
              setInputs({ ...inputs, username: e.target.value });
            }}
            label={"Email"}
            placeholder={"johndoe@gmail.com"}
          />
          <InputBox
            value={inputs.password}
            onChange={(e) => {
              setInputs({ ...inputs, password: e.target.value });
            }}
            label={"Password"}
            placeholder={"123456"}
          />
          <div className="pt-3">
            <Button
              onClick={signupUser}
              label={"Sign up"}
              color={"bg-slate-800"}
              hover={"bg-slate-900"}
            />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
