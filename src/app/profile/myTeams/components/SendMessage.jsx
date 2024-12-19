"use client";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

const SendMessage = ({ onSendMsg }) => {
  const [message, setMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      onSendMsg(message);
      setMessage("");
    }
  };
  return (
    <form id="sendMsg" suppressHydrationWarning className="flex gap-2 mt-4">
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
  );
};

export default SendMessage;
