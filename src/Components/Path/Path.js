import { Link } from "react-router-dom";
import "./Path.css";

const Path = ({ title }) => (
  <div className="metaportal_fn_pagetitle">
    <div className="container small">
      <div className="pagetitle">
        <h3 className="fn__maintitle big">{title}</h3>
        <p>
          <Link to="/">Home</Link>
          <span className="divider">/</span>
          <span className="text">{title}</span>
        </p>
      </div>
    </div>
  </div>
);

export default Path;
