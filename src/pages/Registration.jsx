import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registration({ setShowNavbar }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [serviceBranch, setServiceBranch] = useState("");
  const [yearsOfService, setYearsOfService] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShowNavbar(false);
  }, [setShowNavbar]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true)
    setMessage("");

    if (password !== repeatPassword) {
      console.error("Passwords do not match");
      setMessage("Passwords do not match.");
      setIsProcessing(false);
      return;
    }

if (!serviceBranch || !yearsOfService) {
  setMessage("Branch of service and years of service required.");
  setIsProcessing(false);
  return;
}

    try {
      const response = await fetch("http://localhost:4545/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, serviceBranch, yearsOfService }),
      });
      if (response.ok) {
        setMessage("Registration successful");
        setEmail("");
        setPassword("");
        setRepeatPassword("");
        setTimeout(() => navigate("/entries"), 2000);
      } else {
        const data = await response.json();
        setMessage(data.message || "Login unsuccessful");
      }
    } catch (error) {
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        setMessage("cannot connect to the server. Please check your internet connection or try again later.")
      }
      console.error("Error", error);
      setMessage("An error occurred.");
    }
    finally {
        setIsProcessing(false);
    }
  };

  return (
    <>
<a
          href="/"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          <img
            className="registration-container-img"
            src="public/vetlogo.png"
            alt="logo"
          />
        </a>    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already registered?{" "}
                <a
                  href="login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login
                </a>
              </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-6">
  <label htmlFor="serviceBranch" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    Service Branch
  </label>
  <input
    onChange={(e) => setServiceBranch(e.target.value)}
    type="text"
    id="serviceBranch"
    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
    placeholder="ARMY, NAVY, AIR FORCE, MARINES"
    required
  />
</div>
<div className="mb-6">
  <label htmlFor="yearsOfService" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    Years of Service
  </label>
  <input
    onChange={(e) => setYearsOfService(e.target.value)}
    type="number"
    id="yearsOfService"
    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
    placeholder="OO"
    required
  />
</div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="password"
            required

          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="repeat-password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Repeat password
          </label>
          <input
            onChange={(e) => setRepeatPassword(e.target.value)}
            type="password"
            id="repeat-password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            placeholder="confirm password"required

          />
        </div>
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
              required
            />
          </div>
          <label
            htmlFor="terms"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            I agree with the{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              terms and conditions
            </a>
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Register new account
        </button>
        {message && !isProcessing && <p className="text-red-500">{message}</p>}
      </form>
    </>
  );
}
