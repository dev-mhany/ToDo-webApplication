import "./Button.css";

const Button = ({ text, handleBtnClick, full }) => (
  <button
    className={`metaportal_fn_button ${full}`}
    onClick={handleBtnClick}
    to="/"
  >
    <span>{text}</span>
  </button>
);

export default Button;
