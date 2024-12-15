"use client";

import NotFound from "@/components/not-found";
import { use } from "react";

export default function Profile({searchParams}) {
  const {id} = use(searchParams);
  if(!id) return <NotFound/>;
  return <>Profile</>;
}
