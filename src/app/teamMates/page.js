"use client";

import NotFound from "@/components/not-found";
import { use, useLayoutEffect, useState } from "react";
import LoadingComponent from "../loading";
import TeamMate from "@/components/TeamMate";


export default function teamMatesPage({searchParams}) {
  const [loading, setLoading] = useState(true);
    const [teamMates,setTeamMates] = useState([]);
    const res = async () => {
      try {
        const resp = await fetch("/api/teamMates");
        const data = await resp.json();
  
       setTeamMates(data.users);
        setLoading(false);
      } catch (err) {
       setTeamMates([]);
        setLoading(false);
      }
    };
    useLayoutEffect(() => {
      res();
    }, []);

  const {id} = use(searchParams);
  


  return (
    <>
      {loading && <LoadingComponent />}
      {id ? (
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
                  name={t.name}
                  bio={t.bio}
                  email={t.email}
                  githubID={t.githubID}
                  skills={t.skills}
                />
              ))}
          </div>
        </>
      ) : (
        <>
          <NotFound />
        </>
      )}
    </>
  );
}
