import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Context from "../../Context";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const { logged_in, setLoggedIn } = useContext(Context);
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [userInfo, setuserInfo] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const onChangeValue = (e) => {
    setuserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const signup = async () => {
    try {
      axios
        .post(`http://localhost/apicrud/addusers.php`, {
          fullname: userInfo.fullname,
          email: userInfo.email,
          password: userInfo.password,
        })
        .then((res) => {
          setLoggedIn(res.data.status);
          navigate(`/`);
          return;
        });
    } catch (error) {
      throw error;
    }
  };

  return (
    <form
      className="form-group  form-group--signup"
      onSubmit={handleSubmit(signup)}
    >
      <input
        className="form-group__input"
        type="text"
        id="fullname"
        name="fullname"
        placeholder="Full Name"
        {...register("fullname", {
          required: true,
          pattern: /^[A-Za-z]+$/,
          onChange: onChangeValue,
        })}
      />
      {errors.fullname && (
        <p className="error-msg">
          {errors.fullname.type === "pattern"
            ? "No numbers or special characters allowed"
            : "This field is required"}
        </p>
      )}
      <input
        className="form-group__input"
        type="email"
        id="email"
        name="email"
        placeholder="Email"
        {...register("email", { required: true, onChange: onChangeValue })}
      />
      {errors.email && <p className="error-msg">This field is required</p>}
      <input
        className="form-group__input"
        type="password"
        name="password"
        id="createpassword"
        placeholder="Password"
        {...register("password", {
          required: true,
          minLength: 8,
          pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
          onChange: onChangeValue,
        })}
      />
      {errors.password && (
        <p className="error-msg">
          {errors.password.type === "minLength"
            ? "Password must be 8 characters long"
            : errors.password.type === "pattern"
            ? "password must include at least one uppercase, one lowercase, one number and one special character."
            : "This field is required"}
        </p>
      )}
      <input
        className="form-group__input"
        type="password"
        name="confirm_password"
        id="confirm_password"
        placeholder="Confirm Password"
        {...register("confirm_password", {
          required: true,
          validate: (value) =>
            value === document.getElementById("createpassword").value,
        })}
      />
      {errors.confirm_password && (
        <p className="error-msg">
          {errors.confirm_password.type === "validate"
            ? "Passwords don't match"
            : "This field is required"}
        </p>
      )}
      <button
        className="form-group__input button button--primary full-width"
        type="submit"
      >
        Sign up
      </button>
    </form>
  );
}
