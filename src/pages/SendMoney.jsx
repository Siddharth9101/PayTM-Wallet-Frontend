import { useSearchParams } from "react-router-dom";
import TransferMoney from "../components/TransferMoney";

const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get("name");
  const id = searchParams.get("id");
  return (
    <div className="h-screen w-full flex justify-center items-center bg-slate-200">
      <TransferMoney name={name} id={id} />
    </div>
  );
};

export default SendMoney;
