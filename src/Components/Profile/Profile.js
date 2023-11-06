import { useContext } from "react";
import Loader from "../../Loader/Loader";
import Path from "../Path/Path";
import Context from "../../Context";
import "./Profile.css";

export default function Profile() {
  const { isLoading } = useContext(Context);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Path title="Profile" />
        </>
      )}
    </>
  );
}
