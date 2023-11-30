import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Welcome.css"; 

export default function Welcome({ setShowNavbar }) {

  useEffect(() => {
    setShowNavbar(false);
  }, [setShowNavbar]);
  
  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900 overflow-hidden" style={{ height: '100vh' }}>
      <header className="text-center pt-4 top-0 left-0 right-0 bg-transparent z-10">
        <h1 className="text-4xl font-bold text-white mb-4" style={{ fontFamily: 'GrandCru'}}>Welcome to</h1>
        <a href="/" className="inline-block">
          <img
            className="w-60 h-auto" 
            src="/vetLogo.png" 
            alt="Mindful March Logo"
          />
        </a>
      </header>
<p className="hero-text text-3xl">Helping Veterans achieve better mental wellness through mindfulness and self care</p>
      

      <div className="hero-prompt relative z-10 flex flex-col items-center justify-center min-h-screen pt-15">
        <div className="space-x-4 mt-4">
          <Link
            to="/login"
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 rounded-lg"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-gray-900 rounded-lg border-4 border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"

          >
            Register
          </Link>
        </div>
        <div >
        <img
          className="soldado"
          src="/Untitled (14).png" 
          alt="Soldado"
          style={{ 
            height: '250%',
            transform: 'scale(1.3)',
            transformOrigin: 'top' 
          }}
        />
      </div>
      </div>
    </div>
  );
}


