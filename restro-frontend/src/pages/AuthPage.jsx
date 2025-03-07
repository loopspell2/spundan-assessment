import React, { useEffect, useState } from "react";
import { signin, signup } from "../actions/auth";
import { useNavigate } from "react-router-dom";

function AuthPage({setIsAuthenticated}) {

  const [isSignIn, setIsSignIn] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const token = document.cookie.split('=')[1];
    console.log("token : ",token)
    if(token){
      setIsAuthenticated(true);
      navigate('/');
    }
  },[])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isSignIn ? "Sign In" : "Sign Up"}
        </h2>

        <div className="form-container">
          {isSignIn ? <SignIn setIsAuthenticated={setIsAuthenticated}/> : <SignUp setIsAuthenticated={setIsAuthenticated}/>}
        </div>

        <div className="flex justify-center mt-4">
          <button
            className="text-blue-500"
            onClick={() => setIsSignIn(!isSignIn)}
          >
            {isSignIn
              ? "Don't have an account? Sign Up"
              : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}

function SignIn({setIsAuthenticated}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState();

  const handleChange = (e) => {
    // const { name, value } = e.target;
    setMessage("");
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signin(formData);
    // console.log("response : ", response);
    if(response.status){
      setIsAuthenticated(true)
      navigate('/')
    }
    setMessage(response);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          name="username"
          type="text"
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your username"
          onChange={handleChange}
          value={formData.name}
          required
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          name="password"
          type="password"
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your password"
          onChange={handleChange}
          value={formData.name}
          required
        />
      </div>

      {message && (
        <div className={`${message.status ? "text-blue-500" : "text-red-500"}`}>
          {message.message}
        </div>
      )}

      <button
        type="submit"
        className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
      >
        Sign In
      </button>
    </form>
  );
}

function SignUp({setIsAuthenticated}) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    password: "",
  });
  const [message, setMessage] = useState();

  const handleChange = (e) => {
    // const { name, value } = e.target;
    setMessage("")
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await signup(formData);
    // console.log("response : ", response);
    if(response.status){
      setIsAuthenticated(true)
      navigate('/');
    }
    setMessage(response);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Full Name
        </label>
        <input
          id="name"
          name="fullname"
          type="text"
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your full name"
          onChange={handleChange}
          value={formData.fullname}
          required
        />
      </div>
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-700"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      {message && (
        <div className={`${message.status ? "text-blue-500" : "text-red-500"}`}>
          {message.message}
        </div>
      )}
      <button
        type="submit"
        className="w-full py-2 mt-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
      >
        Sign Up
      </button>
    </form>
  );
}

export default AuthPage;
