import React from "react";

const MyTeamsUI = () => {
  return (
    <div className="flex-1 flex items-center justify-center bg-bgSecondary">
      <p className="text-gray-400">Select a chat to get started</p>
    </div>
  );
};

export default MyTeamsUI;

// "use client";
// import React, { useState } from "react";
// import Sidebar from "./components/Sidebar";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
// import SendMessage from "./components/SendMessage";

// const ChatUI = () => {
//   const [selectedContact, setSelectedContact] = useState({
//     id: 1,
//     name: "John Smith",
//     lastMessage: "See you tomorrow!",
//     avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
//     online: true,
//     lastSeen: "Just now",
//   });
//   const [newMessage, setNewMessage] = useState("");

//   const contacts = [
//     {
//       id: 1,
//       name: "John Smith",
//       lastMessage: "See you tomorrow!",
//       avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde",
//       online: true,
//       lastSeen: "Just now",
//     },
//     {
//       id: 2,
//       name: "Emma Wilson",
//       lastMessage: "Thanks for your help",
//       avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
//       online: false,
//       lastSeen: "2 hours ago",
//     },
//     {
//       id: 3,
//       name: "Michael Chen",
//       lastMessage: "Great idea!",
//       avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12",
//       online: true,
//       lastSeen: "Just now",
//     },
//   ];

//   const messages = [
//     {
//       id: 1,
//       senderId: 1,
//       content: "Hey, how are you?",
//       timestamp: "10:30 AM",
//     },
//     {
//       id: 2,
//       senderId: "me",
//       content: "I'm good! Just finished the project.",
//       timestamp: "10:31 AM",
//     },
//     {
//       id: 3,
//       senderId: 1,
//       content: "That's great! Would you like to discuss the next steps?",
//       timestamp: "10:32 AM",
//     },
//   ];

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (newMessage.trim()!=="") {
//       // Handle sending message logic here
//       setNewMessage("");
//     }
//   };

//   return (
//       <div className="flex-1 flex flex-col">
//         {selectedContact && (
//           <>
//             {/* Chat Header */}
//             <div className="p-4 bg-bgPrimary border-b-[.1px] border-bgSecondary flex items-center">
//               <img
//                 src={selectedContact.avatar}
//                 alt={selectedContact.name}
//                 className="w-10 h-10 rounded-full object-cover"
//               />
//               <div className="ml-4">
//                 <h2 className="font-semibold text-textPrimary">
//                   {selectedContact.name}
//                 </h2>
//                 <div className="flex items-center">
//                   {/* <BsCircleFill
//                     className={`w-2 h-2 ${
//                       selectedContact.online
//                         ? "text-green-500"
//                         : "text-gray-400"
//                     }`}
//                   /> */}
//                   <span className="text-sm text-gray-400 ml-2">
//                     {selectedContact.online
//                       ? "Online"
//                       : selectedContact.lastSeen}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 overflow-y-auto p-4 bg-bgSecondary">
//               {messages.map((message) => (
//                 <div
//                   key={message.id}
//                   className={`flex ${
//                     message.senderId === "me" ? "justify-end" : "justify-start"
//                   } mb-4`}
//                 >
//                   <div
//                     className={`max-w-[70%] rounded-lg p-3 ${
//                       message.senderId === "me"
//                         ? "bg-[#a600f0] text-white"
//                         : "bg-textBgPrimary text-textPrimary"
//                     }`}
//                   >
//                     <p>{message.content}</p>
//                     <span
//                       className={`text-xs ${
//                         message.senderId === "me"
//                           ? "text-blue-100"
//                           : "text-gray-400"
//                       } mt-1 block`}
//                     >
//                       {message.timestamp}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             {/* Message Input */}

//             <div className="p-4 bg-bgSecondary">
//               <SendMessage onSendMsg={handleSendMessage} />
//             </div>
//           </>
//         )}
//       </div>

//   );
// };

// export default ChatUI;
