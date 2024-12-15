"use client";

import { getToken } from "@/lib/verifyToken";
import { redirect, useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";


import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function createTeam() {
  useLayoutEffect(()=>{
    const token = getToken();
    if(!token) redirect("/");
  })
  // to show floating labels if focused on input fields
  const [isNameFocus, setIsNameFocus] = useState(false);
   const [isEmailFocus, setIsEmailFocus] = useState(false);
   const [isghFocus, setIsghFocus] = useState(false);
   const [isDescFocus, setIsDescFocus] = useState(false);
   const [isSkillsFocus, setIsSkillsFocus] = useState(false);

   
  //router
  const router = useRouter();


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
      
        try {
          const data = new FormData(e.currentTarget);
          const name = data.get("name");
          const desc = data.get("desc");
          const github = data.get("github");
          const skills = data.get("skills");
          const email = data.get("email");
  
          const skillsArr = [...skills.split(",")];
  
          if (skills.includes(",") && skillsArr.length >= 5) {
            const response = await fetch("/api/createTeam", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                name,
                email,
                github,
                desc,
                skills: skillsArr,
              }),
            });
  
            if (response.status === 201) {
              toast.success("Team created!");
              setInterval(() => {
                router.push("/teams");
              }, 3000);
            }
          } else {
            toast.error(
              "Skills should be ',' separated and Atleast 5 skills should be added!"
            );
          }
        } catch (error) {
          toast.error(error.message);
        }
      
    };


  return (
    <>
      <ToastContainer position="bottom-left" theme="dark" />
      <div className="main-div w-1/3 max-[900px]:w-full  p-7 m-auto mt-10 flex flex-col gap-2 justify-center items-center">
        <h1 className="text-center mb-2 section-title text-textPrimary poppins-semibold text-[28px]">
         Create a new Team
        </h1>
        <form onSubmit={handleSubmit} className="login-signup-form">
          <div className="flex flex-wrap gap-2">
            <div className="input-div">
              <input
                type="text"
                onFocus={() => {
                  setIsNameFocus(true);
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    setIsNameFocus(false);
                  } else {
                    setIsNameFocus(true);
                  }
                }}
                id="name"
                name="name"
                aria-describedby="name"
                className="text-textPrimary"
                required
              />
              <label
                htmlFor="name"
                className="labelLine"
                style={getStyle(isNameFocus)}
              >
                Name
              </label>
            </div>

          </div>
          <div className="flex flex-wrap gap-2">
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
                id="email"
                name="email"
                aria-describedby="emailSignup"
                className="text-textPrimary"
                required
              />
              <label
                htmlFor="email"
                className="labelLine"
                style={getStyle(isEmailFocus)}
              >
                Email
              </label>
            </div>
            <div className="input-div">
              <input
                type="text"
                onFocus={() => {
                  setIsghFocus(true);
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    setIsghFocus(false);
                  } else {
                    setIsghFocus(true);
                  }
                }}
                id="github"
                name="github"
                aria-describedby="github"
                className="text-textPrimary"
                required
              />
              <label
                htmlFor="githubID"
                className="labelLine"
                style={getStyle(isghFocus)}
              >
                Github Link
              </label>
            </div>
          </div>
          <span className="text-xs mb-2.5 text-textBgPrimaryHv hidden min-[480px]:block w-auto max-[480px]:max-w-56">
            *Skills should be ',' separated. Eg.: React.js, Node.js,
            Docker,MongoDB*
            <br />
            <br />
            *Atleast 5 skills should be added*
          </span>
          <div className="flex flex-wrap gap-2">
            <div className="input-div">
              <textarea
                onFocus={() => {
                  setIsDescFocus(true);
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    setIsDescFocus(false);
                  } else {
                    setIsDescFocus(true);
                  }
                }}
                id="desc"
                name="desc"
                aria-describedby="desc"
                className="text-textPrimary"
                minLength={100}
                required
              ></textarea>
              <label
                htmlFor="desc"
                className="labelLine"
                style={
                  isDescFocus ? { ...onFocusStyle } : { display: "inherit" }
                }
              >
                Description
              </label>
            </div>
            <span className="text-xs mb-2.5 text-textBgPrimaryHv hidden max-[480px]:block w-auto max-[500px]:max-w-56">
              *Skills should be ',' separated. Eg.: React.js, Node.js,
              Docker,MongoDB*
              <br />
              <br />
              *Atleast 5 skills should be added*
            </span>
            <div className="input-div">
              <textarea
                onFocus={() => {
                  setIsSkillsFocus(true);
                }}
                onBlur={(e) => {
                  if (e.target.value === "") {
                    setIsSkillsFocus(false);
                  } else {
                    setIsSkillsFocus(true);
                  }
                }}
                id="skills"
                name="skills"
                aria-describedby="skills"
                className="text-textPrimary"
                title="Atleast 5 Skills should be added!"
                required
              ></textarea>
              <label
                htmlFor="skills"
                className="labelLine"
                style={getStyle(isSkillsFocus)}
              >
                Skills
              </label>
            </div>
          </div>

          <button
            className="submit text-textPrimary hover:bg-textBgPrimaryHv hover:text-black hover:text-center px-1 py-2 w-[10rem] border-[1px] rounded-md border-textBgPrimaryHv"
            type="submit"
            id="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
