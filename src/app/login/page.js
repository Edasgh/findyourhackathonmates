"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [token, setToken] = useState(null);

  //to show floating labels if focused on input fields
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);
  const [isEmailFocus, setIsEmailFocus] = useState(false);
  // to show / hide the password
  const [isShown, setIsShown] = useState(false);

  //router
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData(e.currentTarget);
      const email = data.get("emailLogin");
      const password = data.get("passwordLogin");

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
        toast.success("Logged In Successfully!");
        setInterval(() => {
          router.push("/");
        }, 3000);
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error.message);
    }
  };

  const onFocusStyle = {
    padding: "0 0.5rem",
    color: " var(--text-secondary)",
    transform: " translate(-10px, -17px) scale(0.8)",
    zIndex: "8",
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("token");
      setToken(savedToken);
      if (savedToken) {
        router.push("/");
      }
    }
  }, []);

  const getStyle = (isFocus) => {
    return isFocus ? onFocusStyle : { display: "inherit" };
  };

 

  return (
    <>
      <ToastContainer position="bottom-left" theme="dark" />
      <div className="main-div w-1/3 max-[900px]:w-full p-7 m-auto mt-10 flex flex-col gap-2 justify-center items-center">
        <h1 className="section-title poppins-semibold text-textPrimary text-[28px]">
          Welcome Back!
        </h1>
        <form onSubmit={handleSubmit} className="login-signup-form">
          <div className="input-div">
            <input
              type="email"
              onFocus={() => {
                setIsEmailFocus(true);
              }}
              onBlur={(e) => {
                if (e.target.value === "") {
                  setIsEmailFocus(false);
                } else {
                  setIsEmailFocus(true);
                }
              }}
              id="emailLogin"
              name="emailLogin"
              aria-describedby="emailLogin"
              className="text-textPrimary"
              required
            />
            <label
              htmlFor="emailLogin"
              className="labelLine"
              style={getStyle(isEmailFocus)}
            >
              Email
            </label>
          </div>
          <div className="input-div">
            <input
              type={isShown ? "text" : "password"}
              className="form-control text-textPrimary"
              onFocus={() => {
                setIsPasswordFocus(true);
              }}
              onBlur={(e) => {
                if (e.target.value === "") {
                  setIsPasswordFocus(false);
                } else {
                  setIsPasswordFocus(true);
                }
              }}
              name="passwordLogin"
              id="passwordLogin"
              minLength={8}
              required
            />
            <span
              className={
                "absolute top-2 left-[72%] w-[6.5rem] bg-transparent cursor-pointer z-10"
              }
            >
              <FontAwesomeIcon
                icon={isShown ? faEyeSlash : faEye}
                onClick={() => {
                  setIsShown(!isShown);
                  document.getElementById("passwordLogin").focus();
                }}
              />
            </span>
            <label
              htmlFor="passwordLogin"
              className="labelLine"
              style={getStyle(isPasswordFocus)}
            >
              Password
            </label>
          </div>

          <div className="form-flex">
            <Link
              href="/forgot_password"
              className="text-sm underline text-textSecondary"
            >
              Forgot Password?
            </Link>
            <p className="text-sm my-2 text-textPrimary">
              Don't have an account ?{" "}
              <Link href="/signup" className="text-textSecondary underline">
                Create here
              </Link>
            </p>
          </div>
          <button
            className="login-submit hover:bg-textBgPrimaryHv text-textPrimary hover:text-black hover:text-center px-1 py-2 w-[10rem] border-[1px] rounded-md border-textBgPrimaryHv"
            type="submit"
            id="login-btn"
          >
            Log In
          </button>
        </form>
      </div>
    </>
  );
}