import { useContext, useEffect } from "react";
import Context from "../../Context";
import Loader from "../../Loader/Loader";
import TODO from "../TODO/TODO";
import Navbar from "./../Navbar/Navbar";

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
          <Navbar />
          <TODO />
        </>
      )}
    </>
  );
}
