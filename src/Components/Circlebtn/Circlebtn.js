import { useState, useEffect, useContext } from "react";
import "./Circlebtn.css";
import { Link } from "react-router-dom";
import Context from "../../Context";
import { getAuth } from "firebase/auth";

export default function CircleBtn() {
  const [active, setActive] = useState(false);
  const { userData } = useContext(Context);

  useEffect(() => {
    console.log(userData); // This will log the updated userData
  }, [userData]);

  const handleClick = () => {
    setActive(!active);
  };

  const logout = async () => {
    // TODO : stop listening to notifications
    getAuth().signOut()
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
