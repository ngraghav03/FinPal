import React, { useState } from "react";
import GoogleSignIn from "./GoogleSignIn";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function submit(event) {
      event.preventDefault();

      try {
        const response = await axios.post("http://localhost:3000/login", { username: email, password: password }, { withCredentials: true,});
        console.log("response from backend: " + JSON.stringify(response.data));
        if (response.data.isAuthenticated) {
          navigate("/app/dashboard");
        } else {
          setEmail("");
          setPassword("");
        }
      } catch (error) {
        console.log(error);
      }
    }

    return (
      <>
        {/*
          This example requires updating your template:
  
          ```
          <html class="h-full bg-white">
          <body class="h-full">
          ```
        */}
        <div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8 dark:bg-sky-950">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/plus/img/logos/mark.svg?color=cyan&shade=400"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-slate-50">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="http://localhost:3000/login" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 text-left dark:text-slate-50">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    required
                    className="block dark:bg-black opacity-25 dark:border-neutral-700 dark:focus-within:border-cyan-500 w-full rounded-md border-0 py-1.5 text-slate-50 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(event) => {
                      setEmail(event.target.value);
                    }}
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50">
                    Password
                  </label>
                  <div className="text-sm">
                    {/* <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500"> */}
                      Forgot password?
                    {/* </a> */}
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    required
                    className="block dark:bg-black opacity-25 dark:border-neutral-700 w-full rounded-md border-0 py-1.5 text-slate-50 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    onChange={(event) => {
                      setPassword(event.target.value);
                    }}
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex dark:bg-cyan-500 dark:text-sky-950 w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-md font-semibold leading-6 text-white shadow-sm hover:bg-cyan-600 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 mb-2"
                  onClick={submit}
                >
                  Sign in
                </button>

                
                  
                
              </div>
            </form>
            <GoogleSignIn />
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <Link to="/register" className="font-semibold leading-6 text-cyan-500 hover:text-cyan-700">
                Register now
              </Link>
            </p>
          </div>
        </div>
      </>
    )
  }


export default Login;