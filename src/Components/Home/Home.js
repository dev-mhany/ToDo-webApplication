import { useContext } from "react";
import Context from "../../Context";
import Loader from "../../Loader/Loader";
import TODO from "../TODO/TODO";
import Navbar from "./../Navbar/Navbar";

export default function Home() {
  const { isLoading } = useContext(Context);

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
