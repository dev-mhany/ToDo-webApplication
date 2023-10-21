import { useContext, useEffect } from "react";
import Context from "../../Context";
import { useState } from "react";
import Login_Signup from "../Login_Signup/Login_Signup";
import Loader from "../../Loader/Loader";

export default function Membership() {
  const [action, setAction] = useState("login");

  const { isLoading, setIsLoading } = useContext(Context);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("loading");
    }, 3000);
  }, []);

  const toggleAction = () => {
    var newAction = action === "login" ? "signup" : "login";
    setAction(newAction);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={`app app--is-${action}`}>
            <div>
              <div
                className={`form-block-wrapper form-block-wrapper--is-${action}`}
              ></div>
              <section className={`form-block form-block--is-${action}`}>
                <header className="form-block__header">
                  <h1>{action === "login" ? "Welcome back!" : "Sign up"}</h1>
                  <div className="form-block__toggle-block">
                    <span>
                      {action === "login" ? "Don't" : "Already"} have an
                      account? Click here &#8594;
                    </span>
                    <input
                      id="form-toggler"
                      type="checkbox"
                      onClick={toggleAction}
                    />
                    <label htmlFor="form-toggler"></label>
                  </div>
                </header>
                <Login_Signup />
              </section>
            </div>
          </div>{" "}
        </>
      )}
    </>
  );
}
