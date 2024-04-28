import Link from 'next/link';
import React, { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "@/styles/Color.module.css";
function Forgot() {
  const [email, setEmail] = useState("");
  const [emailError, setemailError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true); // Set loading state to true when the button is clicked

    fetch(`/api/user/emailcheck?email=${email}`)
      .then((response) => {
        if (!response.ok) {
          
          toast.error('Error occurred while checking email', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          return ;
        }
        return response.json();
      })
      .then((data) => {
        if (data.exists) {
          // Email exists, call OTP generation API
          fetch(`/api/user/otp-generate?email=${email}`, {
            method: "GET",
          })
            .then((response) => {
              if (!response.ok) {
                
                toast.error('Error occurred while generating OTP', {
                  position: "top-right",
                  autoClose: 1000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
                return ;
              }
              return response.json();
            })
            .then((data) => {
              
              toast.success("OTP Send On Email ", {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              setemailError("OTP Send On Email");
              router.push({
                pathname: '/otp-verification',
                query: { email },
              });
             
            })
            .catch((error) => {
              toast.error(error.message, {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              
            })
            .finally(() => {
              setLoading(false); // Set loading state to false when the API call is complete
            });
        } else {
          toast.error('Email is not registered', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setemailError("Email is not registered");
          setLoading(false); // Set loading state to false when the API call is complete
        }
      })
      .catch((error) => {
        toast.error(error.message, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
       
        setLoading(false); // Set loading state to false when the API call is complete
      });
  };

  return (
    <div>
      <div className={`h-screen text-white relative flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ${styles.customcolor}`}>
      <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight ">
              Forgot your password?
            </h2>
            <div className="text-grey-dark text-center mb-4">
              Or/
              <Link
                href="/signin"
                className="relative text-indigo-600 no-underline border-b border-blue text-blue"
              >
                Login
              </Link>
            </div>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div className="text-grey-dark text-center mb-4">
                Enter the email address associated with your account and we’ll send you a OTP to reset your password.
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>

                <input
                  type="text"
                  className="relative block border text-black border-grey-light w-full p-3 rounded mb-4"
                  name="email"
                  required
                  placeholder="Email"
                  value={email}
                  onClick={(e) => setemailError("")}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(e.target.value)) {
                      setemailError("Please enter a valid email address.");
      
                    } else {
                      setemailError("");
                    }
                  }}
                />
                {emailError && <div className="text-red-500">{emailError}</div>}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative flex w-full justify-center rounded-md bg-blue-900 py-2 px-3 text-sm font-semibold text-white hover:bg-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                disabled={loading} // Disable the button when loading state is true
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  {loading && (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zm7-2.647l3 2.647C19.865 17.824 21 15.042 21 12h-4a7.96 7.96 0 01-2 5.291zM14 4.515V0h-4v4.515A8.003 8.003 0 0112 4c1.657 0 3 1.343 3 3h-2c0-.552-.448-1-1-1s-1 .448-1 1h-2c0-1.657 1.343-3 3-3a3.96 3.96 0 012.586 1H14z"
                      ></path>
                    </svg>
                  )}
                </span>
                {loading ? "Loading..." : "Continue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Forgot;
