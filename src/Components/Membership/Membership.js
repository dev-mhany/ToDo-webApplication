import { useContext } from "react";
import Context from "../../Context";
import { useState } from "react";
import LoginSignup from "../Login_Signup/Login_Signup";
import Loader from "../../Loader/Loader";

export default function Membership() {
  const [action, setAction] = useState("login");

  const { isLoading } = useContext(Context);

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
                <LoginSignup />
              </section>
            </div>
          </div>{" "}
        </>
      )}
    </>
  );
}
