import OAuth from "../components/OnAuth";
import classes from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const { error, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://mern-kzu7.onrender.com/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        throw new Error("Signup failed");
      }
      const data = await res.json();
      console.log(data);
      navigate("/");
    } catch (error) {}
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Sign Up</h1>
      <form onSubmit={handleSignUp} className={classes.form}>
        <input
          type="text"
          placeholder="Username"
          className={classes.input}
          id="name"
          onChange={handleChange}
        />
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
          {loading ? "Loading..." : "Sign Up"}
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
        <p>Already have an account?</p>
        <Link to={"/"} className={classes.link}>
          <span>Sign In</span>
        </Link>
      </div>
      {error && (
        <p style={{ color: "#EF4444", marginTop: "1.25rem" }}>{error}</p>
      )}
    </div>
  );
}
