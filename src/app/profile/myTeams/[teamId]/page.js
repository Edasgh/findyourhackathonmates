"use client";
import React, { useLayoutEffect, useState } from "react";

import useChat from "@/hooks/useChat";
import ChatLoader from "../components/ChatLoader";
import CustomAvatar from "@/components/CustomAvatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const TeamChat = () => {
  const { teamId } = useChat();
  const [loading, setLoading] = useState(true);
  const [teamData, setTeamData] = useState(null);

  const getMessages = async () => {
    try {
      const res = await fetch(`/api/profile/myTeams`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          id: teamId,
        }),
      });
      const data = await res.json();
      if (res.status === 200) {
        setTeamData(data);
        // console.log(data);
        setInterval(() => {
          setLoading(false);
        }, 900);
      } else {
        throw new Error("Team not found!");
      }
    } catch (error) {
      setTeamData(null);
      setInterval(() => {
        setLoading(false);
      }, 900);
    }
  };

  useLayoutEffect(() => {
    getMessages();
  }, []);

  const [message, setMessage] = useState("");
   const handleSubmit = (e) => {
     e.preventDefault();
     if (message.trim() !== "") {
       onSendMsg(message);
       setMessage("");
     }
   };

  return (
    <>
      {loading ? (
        <ChatLoader />
      ) : (
        <>
          {teamData !== null && (
            <>
              <div className="p-4 bg-bgPrimary border-b-[.1px] border-bgSecondary flex gap-2 items-center">
                <Link className="text-lg mr-2 max-[750px]:flex min-[750.1px]:hidden text-textPrimary text-left" href="/profile/myTeams" >
                  <FontAwesomeIcon icon={faArrowLeft} />
                </Link>
                <CustomAvatar name={teamData.name} />
                <div className="ml-4">
                  <h2 className="font-semibold text-textPrimary">
                    {teamData.name}
                  </h2>
                  <span className="text-sm text-gray-600 ml-2">
                    {`${teamData.members.length} ${
                      teamData.members.length === 1 ? "Member" : "Members"
                    }`}
                  </span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 bg-bgSecondary">
                {teamData.messages.length !== 0 &&
                  teamData.messages.map((message, index) => (
                    <div key={index} className={`flex justify-end  mb-4`}>
                      <div
                        className={`max-w-[70%] rounded-lg p-3 bg-[#a600f0] text-white`}
                      >
                        <p>{message.message}</p>
                        <span className={`text-xs text-blue-100 mt-1 block`}>
                          timestamp
                        </span>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Message Input */}

              <div className="p-4 bg-bgSecondary">
                <form
                  id="sendMsg"
                  suppressHydrationWarning
                  className="flex gap-2 mt-4"
                  onSubmit={handleSubmit}
                >
                  <input
                    type="text"
                    name="msg"
                    id="msg"
                    className="flex-1 w-full px-4 border-2 py-2 rounded-lg bg-textBgPrimary focus:outline-none"
                    placeholder="Type your message here....."
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    suppressHydrationWarning
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 text-textPrimary rounded-lg bg-[#a600f0]"
                  >
                    <FontAwesomeIcon icon={faPaperPlane} />
                  </button>
                </form>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default TeamChat;
