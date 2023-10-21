import { useContext, useEffect } from "react";
import Loader from "../../Loader/Loader";
import Path from "../Path/Path";
import Context from "../../Context";
import "./Profile.css";

export default function Profile() {
  const { isLoading, setIsLoading } = useContext(Context);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

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
