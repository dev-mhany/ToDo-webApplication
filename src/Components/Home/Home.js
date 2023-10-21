import { useContext, useEffect } from "react";
import Context from "../../Context";
import Loader from "../../Loader/Loader";
import Path from "../Path/Path";

export default function Home() {
  const { isLoading, setIsLoading } = useContext(Context);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("loading");
    }, 3000);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Path title="Home" />
        </>
      )}
    </>
  );
}
