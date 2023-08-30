import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loginResult, setLoginResult] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };


axios.defaults.withCredentials = true;
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://smcsserver.vercel.app", { email, password })
      .then((result) => {
        setLoginResult(result.data);
        if (result.data === "Success") {
          // Regular user login successful
          localStorage.setItem("userEmail", email);
          navigate("/StudentDashboard");
        } else if (result.data === "Admin") {
          // Admin login successful
          localStorage.setItem("userEmail", email);
          navigate("/adminDashboard");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={handleLoginSubmit}>
      <h1 className="w-[100%] text-center font-extrabold">Login Form</h1>
      <div className="form-control">
        {loginResult.length > 0 && (
          <p className="bg-yellow-200 p-1 text-xl border-l-8 border-yellow-400 text-center my-2 w-full text-yellow-700">
            {loginResult}!!
          </p>
        )}
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          type="text"
          placeholder="email"
          name="email"
          className="input input-bordered"
          onChange={handleEmailChange}
          value={email}
        />
      </div>
      <div className="form-control">
        <label className="label">
          <span className="label-text">Password</span>
        </label>
        <input
          type="password"
          placeholder="password"
          name="password"
          className="input input-bordered"
          onChange={handlePasswordChange}
          value={password}
        />
      </div>
      <div className="form-control mt-6">
        <button className="btn btn-primary">Login</button>
      </div>
    </form>
  );
};

export default Login;
