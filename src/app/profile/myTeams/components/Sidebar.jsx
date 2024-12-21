"use client";

import React, { useLayoutEffect, useState } from "react";
import TeamsLoader from "./TeamsLoader";
import useChat from "@/hooks/useChat";
import Link from "next/link";
import CustomAvatar from "@/components/CustomAvatar";

const Sidebar = () => {
  const { isActive, teamId } = useChat();
  const [loading, setLoading] = useState(true);
  const [myTeams, setMyTeams] = useState([]);

  const getMyTeams = async () => {
    try {
      const getUser = await fetch("/api/profile");
      const jsonData = await getUser.json();
      if (getUser.status !== 200) {
        throw new Error("Something went wrong!");
      } else {
        const resp = await fetch(`/api/profile/myTeams?id=${jsonData._id}`);
        const data = await resp.json();
        if (resp.status === 200) {
          setMyTeams([...data]);
          setLoading(false);
        } else {
          throw new Error("No teams found!");
        }
      }
    } catch (error) {
      console.log(error);
      setMyTeams([]);
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    getMyTeams();
  }, []);

  return (
    <>
      {loading ? (
        <TeamsLoader />
      ) : (
        <>
          {myTeams.length === 0 ? (
            <>
              <div
                className={`max-[750px]:w-screen min-[750.1px]:w-1/4 ${
                  isActive && "max-[750px]:hidden"
                }  bg-bgSecondary border-r border-textBgPrimary`}
              >
                <h1 className="text-xl font-semibold p-5 border-b border-textBgPrimary text-textPrimary">
                  My Teams
                </h1>
                <div className="overflow-y-auto h-[calc(100vh-5rem)]">
                  <p className="text-sm text-gray-400 p-3">No teams to show</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <div
                className={`max-[750px]:w-screen min-[750.1px]:w-1/4 ${
                  isActive && "max-[750px]:hidden"
                }  bg-bgSecondary border-r border-textBgPrimary`}
              >
                <h1 className="text-xl font-semibold p-5 border-b border-textBgPrimary text-textPrimary">
                  My Teams
                </h1>
                <div className="overflow-y-auto h-[calc(100vh-5rem)]">
                  {myTeams.map((team) => (
                    <Link
                      key={team._id}
                      href={`/profile/myTeams/${team._id}`}
                      title={`${team.members.length} ${
                        team.members.length == 1 ? "Member" : "Members"
                      }`}
                      className={`flex items-center p-4 cursor-pointer hover:bg-bgPrimary border-b border-textBgPrimary
                       ${teamId === team._id && "bg-bgPrimary"} `}
                    >
                      <CustomAvatar name={team.name} />
                      <div className="ml-4 flex-1">
                        <h3 className="text-textPrimary font-semibold">
                          {team.name}
                        </h3>
                        <p className="text-gray-400 text-sm truncate">
                          {team.messages.length !== 0 ? (
                            <>
                              {team.messages[team.messages.length - 1].message}
                            </>
                          ) : (
                            <>
                              {`${team.members.length} ${
                                team.members.length == 1 ? "Member" : "Members"
                              }`}
                            </>
                          )}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Sidebar;
