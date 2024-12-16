"use client";

import NotFound from "@/components/not-found";

import { useLayoutEffect, useState } from "react";
import LoadingComponent from "../loading";

export default function Profile() {
  const [loading,setLoading] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const res = async () => {
    try {
      const resp = await fetch("/api/profile");
      const data = await resp.json();

      setUserDetails(data);
      setLoading(false);
    } catch (err) {
      setUserDetails(null);
      setLoading(false);
    }
  };
  useLayoutEffect(() => {
    res();
  }, []);

  return (
    <>
    {loading?(
      <>
       <LoadingComponent/>
      </>
    ):(
      <>
      {userDetails===null ? (
        <>
              <NotFound/>
        </>
      ):(
        <>
             
        </>
      )}

      </>
    )}
    </>
  )
}
