"use client";

import { faBell, faMessage, faUser } from "@fortawesome/free-regular-svg-icons";
import {
  faPlus,
  faMessage as msg,
  faUser as userIcon,
  faBell as bellIcon,
  faXmark,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useLayoutEffect, useState } from "react";

const ProfileNav = () => {
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [opened, setOpened] = useState(true);
  const res = async () => {
    try {
      const resp = await fetch("/api/profile");
      const data = await resp.json();

      setUserDetails(data);
      setLoading(false);
    } catch (err) {
      setUserDetails(null);
      setLoading(false);
    }
  };
  useLayoutEffect(() => {
    res();
  }, []);

  const [over1, setOver1] = useState(false);
  const [over2, setOver2] = useState(false);
  // const [over3, setOver3] = useState(false);

  return (
    <>
      {!loading && userDetails !== null && (
        <>
          <div
            className={`absolute bg-gray-800 text-white w-40 min-h-screen overflow-y-auto transition-transform transform ${
              opened && "-translate-x-full"
            }  ease-in-out duration-200 `}
            id="sidebar"
          >
            <div className="p-4">
              <h1 className="text-2xl mt-8 font-semibold">
                {" "}
                {userDetails.name}
              </h1>
              <ul className="mt-4">
                <li
                  className="mb-2"
                  onMouseOver={() => {
                    setOver1(true);
                  }}
                  onMouseOut={() => {
                    setOver1(false);
                  }}
                >
                  <Link
                    href="/profile/myTeams"
                    className="block hover:text-indigo-400"
                  >
                    <FontAwesomeIcon icon={over1 ? msg : faMessage} />
                    &nbsp;&nbsp; Teams
                  </Link>
                </li>
                <li
                  className="mb-2"
                  onMouseOver={() => {
                    setOver2(true);
                  }}
                  onMouseOut={() => {
                    setOver2(false);
                  }}
                >
                  <Link href="/profile" className="block hover:text-indigo-400">
                    <FontAwesomeIcon icon={over2 ? userIcon : faUser} />
                    &nbsp;&nbsp; Profile
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex-1 flex flex-col overflow-hidden absolute w-full">
            <div className="bg-bgPrimary shadow">
              <div className="container mx-auto">
                <div className="flex gap-2 py-1 px-2">
                  <button
                    className="text-gray-500 hover:text-gray-600 border-[.5px] p-1 px-2 border-gray-600"
                    id="open-sidebar"
                    onClick={() => {
                      setOpened(!opened);
                    }}
                  >
                    <FontAwesomeIcon icon={faBars} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProfileNav;
