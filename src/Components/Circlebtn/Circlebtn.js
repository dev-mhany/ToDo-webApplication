import "./Circlebtn.css";

const CircleBtn = ({ clickHandler, active }) => (
  <div className={`trigger${active ? " active" : ""}`} onClick={clickHandler}>
    <span />
  </div>
);

export default CircleBtn;
