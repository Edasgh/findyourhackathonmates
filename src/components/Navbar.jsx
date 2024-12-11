"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

import {
  faBars,
  faHouse,
  faCircleQuestion,
  faCircleUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Navbar() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  const [opened, setOpened] = useState(false);
  const [colB1, setColB1] = useState(false);
  const [colB2, setColB2] = useState(false);
  const [colB3, setColB3] = useState(false);
  const router = useRouter();
  const menuTransition = {
    transition: "all 0.2s ease-in-out",
  };
  return (
    <>
      <nav className="navbar flex justify-between">
        <Link href="/">
          <p className="text-textPrimary font-semibold text-3xl cursor-pointer">
              Find Your<span className="text-textSecondary">&nbsp;Hackathon Mates</span>
          </p>
        </Link>
        <FontAwesomeIcon
          icon={faBars}
          className="fa-solid fa-bars text-textPrimary text-2xl cursor-pointer"
          onClick={() => {
            setOpened(!opened);
          }}
        />
      </nav>
      {opened === true && (
        <ul
          type="none"
          style={{ boxShadow: ".5px .5px 1px black,-.5px -.5px 6px black" }}
          className="absolute w-64 top-16 right-8 px-7 py-8 bg-bgSecondary flex flex-col gap-3 justify-end rounded-lg z-[9999999999]"
        >
          <Link
            className=" text-textPrimary hover:bg-textBgPrimaryHv hover:text-black hover:text-center flex gap-4 items-center px-1 py-2"
            href="/"
            style={menuTransition}
            onMouseOver={() => {
              setColB1(true);
            }}
            onMouseOut={() => {
              setColB1(false);
            }}
          >
            <FontAwesomeIcon
              icon={faHouse}
              className={
                colB1 ? "text-black text-2xl" : "text-textPrimary text-2xl"
              }
            />
            Home
          </Link>
          <Link
            className="text-textPrimary hover:bg-textBgPrimaryHv hover:text-black hover:text-center flex items-center gap-4 px-1 py-2"
            href="/about"
            style={menuTransition}
            onMouseOver={() => {
              setColB2(true);
            }}
            onMouseOut={() => {
              setColB2(false);
            }}
          >
            <FontAwesomeIcon
              icon={faCircleQuestion}
              className={
                colB2 ? "text-black text-2xl" : "text-textPrimary text-2xl"
              }
            />
            About
          </Link>
          {token === null || !token ? (
            <>
              <button
                onClick={() => {
                  router.push("/login");
                }}
                className="w-fit border-[1px] border-textBgPrimaryHv hover:bg-textBgPrimaryHv text-textPrimary hover:text-black  px-8 py-3 rounded-md cursor-pointer"
              >
                Login
              </button>
            </>
          ) : (
            <>
              <Link
                className="text-textPrimary hover:bg-textBgPrimaryHv hover:text-black hover:text-center flex gap-4 items-center px-1 py-2"
                href="/profile"
                style={menuTransition}
                onMouseOver={() => {
                  setColB3(true);
                }}
                onMouseOut={() => {
                  setColB3(false);
                }}
              >
                <FontAwesomeIcon
                  icon={faCircleUser}
                  className={
                    colB3 ? "text-2xl text-black" : "text-textPrimary text-2xl"
                  }
                />
                Profile
              </Link>
              <button
                onClick={() => {
                  "use client";
                  setOpened(false);
                  localStorage.removeItem("token");
                  router.push("/login");
                }}
                className="w-fit border-[1px] text-textPrimary border-textBgPrimaryHv hover:bg-textBgPrimaryHv hover:text-black  px-8 py-3 rounded-md"
              >
                Logout
              </button>
            </>
          )}
        </ul>
      )}
    </>
  );
}
