import { useState, useEffect, useContext } from "react";
import "./Circlebtn.css";
import { Link } from "react-router-dom";
import Context from "../../Context";

export default function CircleBtn() {
  const [active, setActive] = useState(false);
  const { logged_in, setLoggedIn, userData, setUserData } = useContext(Context);

  useEffect(() => {
    console.log(userData); // This will log the updated userData
  }, [userData]);

  const handleClick = () => {
    setActive(!active);
  };

  const logout = () => {
    setLoggedIn(!logged_in);
    setUserData({ user_id: "", name: "", email: "" });
  };

  return (
    <div className="User-area">
      <div className="User-avtar" onClick={handleClick}>
        <div className="circle">U</div>
      </div>
      <ul className={!active ? "User-Dropdown" : "User-Dropdown U-open"}>
        <li>
          <Link to="/Profile">My Profile</Link>
        </li>
        <li>
          <Link to="/">Projects</Link>
        </li>
        <li>
          <Link to="/Membership" onClick={logout}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}
