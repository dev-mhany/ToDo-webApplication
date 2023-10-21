import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Context from "../../Context";
import Button from "../Button/Button";
import CircleBtn from "../Circlebtn/Circlebtn";
import "./Navbar.css";

export default function Navbar() {
  const {
    logged_in,
    setLoggedIn,
    userData,
    setUserData,
    leftSidebar,
    IsOpen,
    IsConnected,
  } = useContext(Context);

  const [effect, seteffect] = useState(false);
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    console.log(userData); // This will log the updated userData
  }, [userData]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        seteffect(window.pageYOffset > 10)
      );
    }
  }, []);

  const logout = () => {
    setLoggedIn(!logged_in);
    setUserData({ user_id: "", name: "", email: "" });
  };

  const OpenSidebar = () => {
    IsOpen((leftSidebar) => !leftSidebar);
  };

  const ConnectToWallet = () => {
    IsConnected(true);
  };

  const handleClick = () => {
    setIsShown((current) => !current);
  };

  const location = useLocation();

  return (
    <>
      <div className="metaportal_fn_mobnav">
        <div className="mob_mid">
          <div className="logo">
            <Link to="/">
              <img src="{logo}" alt="Logo" />
            </Link>
          </div>
          <CircleBtn clickHandler={handleClick} active={isShown} />
        </div>
        <div className={isShown ? "mob_bot active" : "mob_bot"}>
          <ul className="mobile-nav">
            <li
              className={
                location.pathname === "/"
                  ? "creative_link active"
                  : "creative_link"
              }
            >
              <Link to="/">Home</Link>
            </li>
            <li
              className={
                location.pathname === "/"
                  ? "creative_link"
                  : "creative_link active"
              }
            >
              <Link to={logged_in ? "/profile" : "/Membership"}>Profile</Link>
            </li>

            <li
              className={
                location.pathname === "/"
                  ? "creative_link"
                  : "creative_link active"
              }
            >
              <Link to={logged_in ? "/" : "/Membership"} onClick={logout}>
                {logged_in ? "Log Out" : "Login / Signup"}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <header id="header">
        <div className={`header ${effect ? "active" : ""}`}>
          <div className="header_in">
            <div className="trigger_logo">
              <div className="logo">
                <Link to="/">
                  <img src="{logo}" alt="Logo" />
                </Link>
              </div>
            </div>

            <div className="nav">
              <ul>
                <li
                  className={
                    location.pathname === "/"
                      ? "creative_link active"
                      : "creative_link"
                  }
                >
                  <Link to="/">Home</Link>
                </li>
                <li
                  className={
                    location.pathname === "/"
                      ? "creative_link"
                      : "creative_link active"
                  }
                >
                  <Link to={logged_in ? "/profile" : "/Membership"}>
                    Profile
                  </Link>
                </li>
              </ul>
            </div>

            <div className="wallet">
              <Link to={logged_in ? "/" : "/Membership"} onClick={logout}>
                <Button
                  text={logged_in ? "Log Out" : "Login / Signup"}
                  handleBtnClick={ConnectToWallet}
                />
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
