"use client";

import React, { useLayoutEffect, useState } from "react";
import TeamsLoader from "./TeamsLoader";
import useChat from "@/hooks/useChat";

const Sidebar = () => {
  const { isActive } = useChat();
  const [loading, setLoading] = useState(true);
  const [myTeams, setMyTeams] = useState([]);

  const getMyTeams = async () => {
    try {
      const resp = await fetch("/api/profile/myTeams");
      const data = await resp.json();
      setMyTeams(data);
      setLoading(false);
    } catch (error) {
      setMyTeams([]);
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    getMyTeams();
  }, []);

  return (
    <>
      {loading && <TeamsLoader />}
      {!loading && myTeams.length === 0 ? (
        <div className={`max-[750px]:w-screen min-[750.1px]:w-1/4 ${isActive && "max-[750px]:hidden" }  bg-bgSecondary border-r border-textBgPrimary`}>
          <h1 className="text-xl font-semibold p-5 border-b border-textBgPrimary text-textPrimary">
            My Teams
          </h1>
          <div className="overflow-y-auto h-[calc(100vh-5rem)]">
            <p className="text-sm text-gray-400 p-3">No teams to show</p>
          </div>
        </div>
      ) : (
        <div
          className={`max-[750px]:w-screen min-[750.1px]:w-1/4 hidden ${
            isActive && "lg-block"
          } ${
            !isActive && "block"
          } bg-bgSecondary border-r border-textBgPrimary`}
        >
          <h1 className="text-xl font-semibold p-5 border-b border-textBgPrimary text-textPrimary">
            My Teams
          </h1>
          <div className="overflow-y-auto h-[calc(100vh-5rem)]">
            {/* {contacts.map((contact) => (
              <div
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`flex items-center p-4 cursor-pointer hover:bg-bgPrimary border-b border-textBgPrimary ${
                  selectedContact?.id === contact.id ? "bg-bgPrimary" : ""
                }`}
              >
                <img
                  src={contact.avatar}
                  alt={contact.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="ml-4 flex-1">
                  <h3 className="text-textPrimary font-semibold">
                    {contact.name}
                  </h3>
                  <p className="text-gray-400 text-sm truncate">
                    {contact.lastMessage}
                  </p>
                </div>
              </div>
            ))} */}
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
