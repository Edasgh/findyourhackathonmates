"use client";

import { useLayoutEffect, useState } from "react";
import Link from "next/link";

import {
  faBars,
  faCircleUser,
  faPlus,
  faPeopleGroup,
  faUserPlus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState(null);
  const [token, setToken] = useState(null);
  const res = async (cache) => {
    try {
       const resp = await fetch("/api/profile", { cache: cache });
       const data = await resp.json();
       setUserDetails(data);
       setToken(true);
    } catch (error) {
      setToken(null);
    }
   
    
  };
  useLayoutEffect(() => {
    res("no-store");
  }, []);

  const handleLogOut = async () => {
    const response = await fetch("/api/logout");
    setUserDetails(null);
    setToken(null);
    if (response.status === 200) {
      window.location.reload();
    }
  };

  const [opened, setOpened] = useState(false);
  const [colB1, setColB1] = useState(false);
  const [colB2, setColB2] = useState(false);
  const [colB3, setColB3] = useState(false);
  const [colB4, setColB4] = useState(false);

  const menuTransition = {
    transition: "all 0.2s ease-in-out",
  };
  return (
    <>
      <nav className="navbar flex gap-2 flex-wrap justify-between">
        <Link href="/">
          <p className="text-textPrimary font-semibold text-3xl flex flex-wrap gap-1 items-end cursor-pointer">
            <span className="text-lg font-extralight"> find your</span>
            <span className="text-textSecondary">&nbsp;HackathonMates</span>
          </p>
        </Link>

        {token === null || !token ? (
          <>
            <button
              onClick={() => {
                router.push("/login");
              }}
              className="w-fit border-[1px] border-textBgPrimaryHv hover:bg-textBgPrimaryHv text-textPrimary hover:text-black  px-8 py-3 rounded-md cursor-pointer"
              suppressHydrationWarning
            >
              Login
            </button>
          </>
        ) : (
          <span className="flex flex-row items-center gap-4">
            <button
              onClick={handleLogOut}
              className="w-fit border-[1px] text-textPrimary border-textBgPrimaryHv hover:bg-textBgPrimaryHv hover:text-black  px-8 py-3 rounded-md"
            >
              Logout
            </button>
            {opened ? (
              <>
                <FontAwesomeIcon
                  icon={faXmark}
                  className="text-textPrimary text-2xl border border-textPrimary p-1 rounded-md cursor-pointer"
                  onClick={() => {
                    setOpened(!opened);
                  }}
                />
              </>
            ) : (
              <>
                <FontAwesomeIcon
                  icon={faBars}
                  className="text-textPrimary text-2xl cursor-pointer"
                  onClick={() => {
                    setOpened(!opened);
                  }}
                />
              </>
            )}
          </span>
        )}
      </nav>
      {opened === true && (
        <ul
          type="none"
          style={{ boxShadow: ".5px .5px 1px black,-.5px -.5px 6px black" }}
          className="absolute w-64 min-[320px]:top-44 min-[446px]:top-32 min-[615px]:top-24 max-[614px]:left-[1rem] min-[615px]:right-8 px-7 py-8 bg-bgSecondary flex flex-col gap-3 justify-end rounded-lg z-[9999999999]"
        >
          <Link
            className="text-textPrimary hover:bg-textBgPrimaryHv hover:text-black hover:text-center flex gap-4 items-center px-1 py-2"
            href="/profile"
            style={menuTransition}
            onMouseOver={() => {
              setColB1(true);
            }}
            onMouseOut={() => {
              setColB1(false);
            }}
          >
            <FontAwesomeIcon
              icon={faCircleUser}
              className={
                colB1 ? "text-2xl text-black" : "text-textPrimary text-2xl"
              }
            />
            Profile
          </Link>
          <Link
            className="text-textPrimary hover:bg-textBgPrimaryHv hover:text-black hover:text-center flex gap-4 items-center px-1 py-2"
            href={
              userDetails !== null
                ? `/createTeam?id=${userDetails._id}`
                : "/createTeam"
            }
            style={menuTransition}
            onMouseOver={() => {
              setColB2(true);
            }}
            onMouseOut={() => {
              setColB2(false);
            }}
          >
            <FontAwesomeIcon
              icon={faPlus}
              className={
                colB2 ? "text-2xl text-black" : "text-textPrimary text-2xl"
              }
            />
            Create your Team
          </Link>
          <Link
            className="text-textPrimary hover:bg-textBgPrimaryHv hover:text-black hover:text-center flex gap-4 items-center px-1 py-2"
            href={
              userDetails !== null
                ? `/teamMates?id=${userDetails._id}`
                : `/teamMates`
            }
            style={menuTransition}
            onMouseOver={() => {
              setColB3(true);
            }}
            onMouseOut={() => {
              setColB3(false);
            }}
          >
            <FontAwesomeIcon
              icon={faUserPlus}
              className={
                colB3 ? "text-2xl text-black" : "text-textPrimary text-2xl"
              }
            />
            Find Teammates
          </Link>
          <Link
            className="text-textPrimary hover:bg-textBgPrimaryHv hover:text-black hover:text-center flex gap-4 items-center px-1 py-2"
            href={
              userDetails !== null ? `/teams?id=${userDetails._id}` : "/teams"
            }
            style={menuTransition}
            onMouseOver={() => {
              setColB4(true);
            }}
            onMouseOut={() => {
              setColB4(false);
            }}
          >
            <FontAwesomeIcon
              icon={faPeopleGroup}
              className={
                colB4 ? "text-2xl text-black" : "text-textPrimary text-2xl"
              }
            />
            Join a Team
          </Link>
        </ul>
      )}
    </>
  );
}
