"use client";

import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ResetPassword({ searchParams }) {
  const [token, setToken] = useState(null);
  const router = useRouter();

  const { id } = use(searchParams);
  if (!id) {
    return <></>;
  }

  // access password & confirm password value
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // to get if the password & confirm password are the same
  const [isSame, setIsSame] = useState(true);
  // to show floating labels if focused on input fields
  const [isPasswordFocus, setIsPasswordFocus] = useState(false);
  const [isCPasswordFocus, setIsCPasswordFocus] = useState(false);

  // to show / hide the password
  const [isShown, setIsShown] = useState(false);
  const [isCPShown, setIsCPShown] = useState(false);

  function matchWPassword(e) {
    if (e.target.value === password) {
      setIsSame(true);
    } else {
      setIsSame(false);
    }
  }

  function matchWCPassword(e) {
    if (e.target.value === confirmPassword) {
      setIsSame(true);
    } else {
      setIsSame(false);
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("token");
      setToken(savedToken);
      if (savedToken) {
        router.push("/");
      }
    }
  }, []);

  const onFocusStyle = {
    padding: "0 0.5rem",
    color: " var(--text-secondary)",
    transform: " translate(-10px, -17px) scale(0.8)",
    zIndex: "8",
  };

  const getStyle = (isFocus) => {
    return isFocus ? onFocusStyle : { display: "inherit" };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSame) {
      try {
        const data = new FormData(e.currentTarget);
        const password = data.get("password");
        const Id = id.split(":");

        const response = await fetch("/api/reset_password", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            id: Id[0],
            password,
          }),
        });

        if (response.status === 200) {
          toast.success("Password updated successfully!");
          setInterval(() => {
            router.push("/login");
          }, 3000);
        }
      } catch (error) {
        toast.error("Something went wrong!");
        console.error(error.message);
      }
    } else {
      toast.error("Password & Confirm password should be same!");
    }
  };

  return (
    <>
      <ToastContainer position="bottom-left" theme="dark" />
      <div className="main-div w-1/3 max-[900px]:w-full p-7 m-auto mt-10 flex flex-col gap-3 justify-center items-center">
        <h1 className="text-center section-title text-textPrimary poppins-semibold text-[28px]">
          Create new Password
        </h1>
        <form className="login-signup-form" onSubmit={handleSubmit}>
          <span
            className={
              isSame
                ? "text-xs mb-3.5 text-textSecondary opacity-100 w-auto max-[480px]:max-w-56"
                : "text-xs mb-3.5 text-[#fa6d6d] opacity-100 w-auto max-[480px]:max-w-56"
            }
          >
            *password & confirm password should be same*
          </span>
          <div className="flex flex-col gap-2">
            <div className="input-div">
              <input
                type={isShown ? "text" : "password"}
                className="form-control text-textPrimary"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  matchWCPassword(e);
                }}
                onFocus={(e) => {
                  setIsPasswordFocus(true);
                  matchWCPassword(e);
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    setIsPasswordFocus(false);
                  } else {
                    setIsPasswordFocus(true);
                  }

                  matchWCPassword(e);
                }}
                name="password"
                id="password"
                minLength={8}
                required
              />
              <span
                className={
                  "absolute top-2 left-[62%] w-[6.5rem] bg-transparent z-10"
                }
              >
                <FontAwesomeIcon
                  icon={isShown ? faEyeSlash : faEye}
                  className="cursor-pointer"
                  onClick={() => {
                    setIsShown(!isShown);
                    document.getElementById("password").focus();
                  }}
                />
              </span>
              <label
                htmlFor="password"
                className="labelLine"
                style={getStyle(isPasswordFocus)}
              >
                Password
              </label>
            </div>

            <div className="input-div">
              <input
                type={isCPShown ? "text" : "password"}
                className="form-control text-textPrimary"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  matchWPassword(e);
                }}
                onFocus={(e) => {
                  setIsCPasswordFocus(true);
                  matchWPassword(e);
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    setIsCPasswordFocus(false);
                  } else {
                    setIsCPasswordFocus(true);
                  }

                  matchWPassword(e);
                }}
                name="confirmPassword"
                id="confirmPassword"
                minLength={8}
                required
              />
              <span
                className={
                  "absolute top-2 left-[62%] w-[6.5rem] bg-transparent z-10"
                }
              >
                <FontAwesomeIcon
                  icon={isCPShown ? faEyeSlash : faEye}
                  className="cursor-pointer"
                  onClick={() => {
                    setIsCPShown(!isCPShown);
                    document.getElementById("confirmPassword").focus();
                  }}
                />
              </span>
              <label
                htmlFor="confirmPassword"
                className="labelLine"
                style={getStyle(isCPasswordFocus)}
              >
                Confirm Password
              </label>
            </div>
          </div>
          <button
            className="reset-password-submit text-textPrimary hover:bg-textBgPrimaryHv hover:text-black hover:text-center px-1 py-2 w-[10rem] border-[1px] rounded-md border-textBgPrimaryHv"
            type="submit"
            id="reset-password-btn"
          >
            Create
          </button>
        </form>
      </div>
    </>
  );
}