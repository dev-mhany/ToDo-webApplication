import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import Context from "../../Context";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
import { errorType } from '../errorType.tsx'
import trackException from '../../utils/track-exception.ts'

export default function Login() {
  const {
    setIsLoading,
  } = useContext(Context);

  const navigate = useNavigate();

  const {
    register,
    formState: { errors,isSubmitting },
    handleSubmit,
    setError

  } = useForm();

  useEffect(() => {
    setIsLoading(isSubmitting);
  }, [isSubmitting,setIsLoading]);

  const onSubmit = handleSubmit(async ({ email, password }) => {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password)
      navigate(`/`);
    } catch (error) {
      setError('email', { type: 'manual', message: errorType[error.code] || error.code })
      trackException('signInWithEmailAndPassword', error, { email })
    }
  })

  return (
    <form
      className="form-group form-group--login"
      onSubmit={onSubmit}
    >
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
        id="password"
        placeholder="Password"
        {...register("password", {
          required: true,
          minLength: 8,
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
      <button
        className="button form-group__input button--primary full-width"
        type="submit"
      >
        Login
      </button>
    </form>
  );
}
