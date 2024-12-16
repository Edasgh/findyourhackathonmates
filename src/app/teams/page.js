"use client";

import NotFound from "@/components/not-found";
import { use, useLayoutEffect, useState } from "react";
import LoadingComponent from "../loading";
import Team from "@/components/Team";

export default function Teams({ searchParams }) {
  const [loading, setLoading] = useState(true);
  const [teamsData, setTeamsData] = useState([]);
  const res = async () => {
    try {
      const resp = await fetch("/api/createTeam");
      const data = await resp.json();

      setTeamsData(data.teams);
      setLoading(false);
    } catch (err) {
      setTeamsData([]);
      setLoading(false);
    }
  };
  useLayoutEffect(() => {
    res();
  }, []);

  const { id } = use(searchParams);

  return (
    <>
      {loading ? (
        <>
          <LoadingComponent />
        </>
      ) : (
        <>
          {id ? (
            <>
              <h1 className="text-center section-title my-12 text-textPrimary poppins-semibold text-4xl">
               Join new Teams
              </h1>
              <div className="w-full flex flex-wrap gap-3">
                {teamsData.length !== 0 &&
                  teamsData.map((t, index) => (
                    <Team
                      key={index}
                      index={index}
                      desc={t.description}
                      email={t.email}
                      githubLink={t.links[0].link}
                      members={t.members}
                      name={t.name}
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
      )}
    </>
  );
}
