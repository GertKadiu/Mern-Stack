import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OnAuth";
import classes from "./Login.module.css";
import { useSelector, useDispatch } from "react-redux";
import { signInSuccess, signInFailure, signInStart } from "../hooks/usersSlice";
import { useState } from "react";

export default function Login() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("https://mern-kzu7.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        dispatch(signInFailure(data.message));
        return;
      }

      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate("/home");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Sign In</h1>
      <form onSubmit={handleSignIn} className={classes.form}>
        <input
          type="email"
          placeholder="email"
          className={classes.input}
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className={classes.input}
          id="password"
          onChange={handleChange}
        />
        <button disabled={loading} className={classes.button}>
          {loading ? "Loading..." : "Sign In"}
        </button>
        <OAuth />
      </form>
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          marginTop: "1.25rem",
          alignItems: "center",
        }}
      >
        <p>Dont have an account?</p>
        <Link to={"/signup"} className={classes.link}>
          <span>Sign Up</span>
        </Link>
      </div>
      {error && (
        <p style={{ color: "#EF4444", marginTop: "1.25rem" }}>{error}</p>
      )}
    </div>
  );
}
