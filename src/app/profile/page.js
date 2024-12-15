"use client";

import NotFound from "@/components/not-found";


import { useLayoutEffect, useState } from "react";

export default function Profile() {
  const [userDetails, setUserDetails] = useState(null);

  useLayoutEffect(() => {
    const res = async () => {
      const resp = await fetch("/api/profile", { cache: "force-cache" });
      const data = await resp.json();
      setUserDetails(data);
    };
    if (userDetails === null) {
      res();
    }
  }, []);
  
  
  if(userDetails===null) return <NotFound/>;
  return (
    <>
    </>
  );
}
