"use client";
import LoadingComponent from "@/app/loading";
import CustomAvatar from "@/components/CustomAvatar";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useLayoutEffect, useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JoinRequests = () => {
  const [loading, setLoading] = useState(true);
  const [reqs, setReqs] = useState([]);
  const getJoinRequests = async () => {
    try {
      const resp = await fetch("/api/joinRequests");
      const data = await resp.json();
      console.log(data);
      setReqs(data);
      setInterval(() => {
        setLoading(false);
      }, 900);
    } catch (error) {
      setReqs([]);
      setInterval(() => {
        setLoading(false);
      }, 900);
    }
  };

  useLayoutEffect(() => {
    getJoinRequests();
  }, []);

  const [over1, setOver1] = useState(false);
  const [over2, setOver2] = useState(false);

  const handleAccept = async (
    message,
    senderName,
    senderId,
    teamId,
    recieverName,
    recieverId
  ) => {
    let tId = toast.loading("Please wait...");

    try {
      const data = {
        message,
        senderName,
        senderId,
        teamId,
        recieverName,
        recieverId,
      };
      const resp = await fetch("/api/invitationAccept", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (resp.status === 200) {
        toast.update(tId, {
          render: "Accepted!",
          type: "success",
          isLoading: false,
          autoClose: 1500,
        });
         setInterval(() => {
           window.location.reload();
         }, 200);
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
      console.log(error.message);
      toast.update(tId, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 1500,
      });
    }
  };

  const handleReject = async (senderId, teamId, recieverId) => {
    const data = { senderId, teamId, recieverId };
    let tId = toast.loading("Please wait...");
    try {
      const resp = await fetch("/api/invitationReject", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (resp.status === 200) {
        toast.update(tId, {
          render: "Rejected!",
          type: "error",
          isLoading: false,
          autoClose: 1500,
        });
         setInterval(() => {
           window.location.reload();
         }, 800);
      } else {
        throw new Error("Something went wrong!");
      }
    } catch (error) {
      console.log(error);
      console.log(error.message);
      toast.update(tId, {
        render: error.message,
        type: "error",
        isLoading: false,
        autoClose: 1500,
      });
    }
  };

  return (
    <>
      <ToastContainer position="top-center" theme="dark" />
      {loading ? (
        <div className="w-screen">
          <LoadingComponent />
        </div>
      ) : (
        <>
          {reqs.length !== 0 ? (
            <>
              {reqs.map((r, i) => (
                <div
                  key={i}
                  className="flex mt-12 w-screen h-fit py-12 flex-col gap-3 justify-center bg-bgSecondary items-center"
                >
                  <h1 className="text-center section-title mb-5 text-textPrimary poppins-semibold text-3xl">
                    Join Requests
                  </h1>
                  <div className="bg-textPrimary flex flex-wrap justify-center items-center gap-2 p-5 rounded-lg w-fit">
                    <CustomAvatar name={r.team.name} />

                    <p className="text-textBgPrimary text-[1rem]">
                      {r.message}
                    </p>
                    <div className="relative flex flex-wrap gap-2">
                      <button
                        className="px-2 py-0.5 rounded-md hover:bg-gray-300"
                        onMouseOver={() => {
                          setOver1(true);
                        }}
                        onMouseOut={() => {
                          setOver1(false);
                        }}
                        onClick={() =>
                          handleAccept(
                            r.message,
                            r.sender.name,
                            r.sender.id,
                            r.team.id,
                            r.reciever.name,
                            r.reciever.id
                          )
                        }
                      >
                        <FontAwesomeIcon
                          className="text-green-700"
                          icon={faCheck}
                        />
                      </button>
                      <span
                        className={`bg-slate-500 text-textPrimary px-2 py-1 text-sm rounded-md absolute bottom-10 ${
                          over1 ? "flex" : "hidden"
                        } `}
                      >
                        Accept
                      </span>
                      <button
                        className="px-2 py-0.5 rounded-md hover:bg-gray-300"
                        onMouseOver={() => {
                          setOver2(true);
                        }}
                        onMouseOut={() => {
                          setOver2(false);
                        }}
                        onClick={() =>
                          handleReject(r.sender.id,r.team.id,r.reciever.id)
                        }
                      >
                        <FontAwesomeIcon
                          className="text-red-700"
                          icon={faXmark}
                        />
                      </button>
                      <span
                        className={`bg-slate-500 text-textPrimary px-2 py-1 text-sm rounded-md absolute bottom-10 ${
                          over2 ? "flex" : "hidden"
                        } `}
                      >
                        Reject
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="flex mt-12 w-screen h-screen py-12 flex-col gap-3 justify-start bg-bgSecondary items-center">
              <h1 className="text-center section-title mb-5 text-textPrimary poppins-semibold text-3xl">
                Join Requests
              </h1>
              <p className="text-gray-400">No Join Requests Here!</p>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default JoinRequests;
