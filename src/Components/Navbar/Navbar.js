import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Context from "../../Context";
import CircleBtn from "../Circlebtn/Circlebtn";
import "./Navbar.css";

export default function Navbar() {
  const [effect, seteffect] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        seteffect(window.pageYOffset > 10)
      );
    }
  }, []);

  const location = useLocation();

  return (
    <>
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

            <div className="wallet">
              <CircleBtn />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
