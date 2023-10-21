import { useContext } from "react";
import Context from "../Context";
import "./Loader.css";

export default function Loader() {
  const { isLoading } = useContext(Context);

  return (
    <div className={`robot-loader ${isLoading ? " visible" : " hidden"}`}>
      <div id="loader"></div>
    </div>
  );
}
