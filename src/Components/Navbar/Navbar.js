import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
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
