import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./LoginPopUp.css";
import cross_icon from "../../assets/cross_icon.png";

function LoginPopUp({ setShowLogin }) {
  const [currState, setCurrState] = useState("Login");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
    unregister
  } = useForm();

  const passwordValue = watch("password");

 const onSubmit = (data) => {
  if (currState === "Sign Up") {
    // Save signup details
    localStorage.setItem("userData", JSON.stringify(data));
    alert("Account created successfully!");
    setCurrState("Login");
    reset();
  } else {
    // Login check
    const savedData = JSON.parse(localStorage.getItem("userData"));

    if (!savedData) {
      alert("No account found. Please sign up first.");
      return;
    }

    if (data.email === savedData.email && data.password === savedData.password) {
      alert("Login successful!");
      reset();
      setShowLogin(false);
    } else {
      alert("Invalid email or password!");
    }
  }
};


  return (
    <>
      <div className="login-popup">
        <form
          className="login-popup-container"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={() => setShowLogin(false)} src={cross_icon} alt="" />
          </div>

          <div className="login-popup-inputs">
            {currState === "Sign Up" && (
              <input
                type="text"
                placeholder="Enter your username"
                {...register("name", { required: currState === "Sign Up" })}
              />
            )}
            {errors.name && <p className="error">*userame is required</p>}

            {/* EMAIL */}
            <input
              {...register("email", {
                required: "*email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "*enter a valid email address",
                },
              })}
              placeholder="Enter your email"
            />
            {errors.email && <p className="error">{errors.email.message}</p>}

            {/* PASSWORD */}
            <input
            type="password"
              {...register("password", {
                required: "*password is required",
                pattern: {
                  value:
                    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                  message:
                    "Password must contain letters, numbers & special characters",
                },
              })}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="error">{errors.password.message}</p>
            )}

            {/* CONFIRM PASSWORD (only in Sign Up) */}
            {currState === "Sign Up" && (
              <>
                <input
                type="password"
                  {...register("confirmPassword", {
                    required: "*confirm password is required",
                    validate: (value) =>
                      value === passwordValue || "*passwords do not match",
                  })}
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <p className="error">{errors.confirmPassword.message}</p>
                )}
              </>
            )}
          </div>

          <button type="submit">
            {currState === "Sign Up" ? "Create Account" : "Login"}
          </button>

          <div className="login-popup-condition">
            <input type="checkbox" {...register("terms", { required: true })} />
            <p>By continuing, I agree to the terms of use & privacy policy.</p>
          </div>
          {errors.terms && <p className="error">*Please accept the terms</p>}

          {/* Toggle Login / Sign Up */}
          {currState === "Login" ? (
            <p>
              Create a new account?{" "}
              <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <span onClick={() => {
                setCurrState("Login");
                unregister("confirmPassword");}}>Login Here</span>
            </p>
          )}
        </form>
      </div>
    </>
  );
}

export default LoginPopUp;
