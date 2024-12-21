"use client";

import NotFoundUser from "@/components/not-found-user";

import { useLayoutEffect, useState } from "react";
import LoadingComponent from "../loading";
import TeamMate from "@/components/TeamMate";
import Footer from "@/components/Footer";

export default function teamMatesPage() {
  const [loading, setLoading] = useState(true);
  const [teamMates, setTeamMates] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const getUserDetails = async () => {
    setLoading(true);
    try {
      const resp = await fetch("/api/profile");
      const data = await resp.json();

      if (data) {
        setUserDetails(data);
      }
      return data;
    } catch (err) {
      console.log(err);
      setUserDetails(null);
    }
  };
  const res = async () => {
    try {
      const user = await getUserDetails();
      const resp = await fetch(`/api/teamMates?id=${user._id}`);
      const data = await resp.json();

      setTeamMates(data.users);
      setLoading(false);
    } catch (err) {
      setTeamMates([]);
      setLoading(false);
    }
  };
  useLayoutEffect(() => {
    getUserDetails();
    res();
  }, []);

  return (
    <>
      {loading && <LoadingComponent />}
      {userDetails !== null ? (
        <>
          <h1 className="text-center section-title my-12 text-textPrimary poppins-semibold text-4xl">
            Connect with Teammates
          </h1>
          <div className="w-full flex flex-wrap gap-3 justify-center items-center">
            {teamMates.length != 0 &&
              teamMates.map((t, index) => (
                <TeamMate
                  key={index}
                  index={index}
                  userId={t._id}
                  name={t.name}
                  bio={t.bio}
                  email={t.email}
                  githubID={t.githubID}
                  skills={t.skills}
                  country={t.country}
                />
              ))}
          </div>
          <div className="mt-[30vh]">
            <Footer/>
          </div>
        </>
      ) : (
        <>
          <NotFoundUser />
          <Footer/>
        </>
      )}
    </>
  );
}
