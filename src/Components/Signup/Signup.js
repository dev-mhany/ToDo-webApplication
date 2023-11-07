import { useForm } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { errorType } from "../errorType.tsx";

export default function Signup() {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm();

  const signup = async ({ fullname, email, password }) => {
    try {
      const result = await createUserWithEmailAndPassword(
        getAuth(),
        email,
        password
      );
      const user = result.user;
      if (!user) return;
      updateProfile(user, { displayName: fullname, photoURL: user.photoURL });
      navigate(`/`);
    } catch (error) {
      setError("email", {
        type: "manual",
        message: errorType[error.code] || error.code,
      });
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
          pattern: /^[A-Z a-z]+$/,
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
        {...register("email", { required: true })}
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
