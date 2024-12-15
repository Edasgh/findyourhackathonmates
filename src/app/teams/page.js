"use client";
import { getToken } from "@/lib/verifyToken";
import { useLayoutEffect } from "react";

export default function Teams() {
  useLayoutEffect(() => {
    const token = getToken();
    if (!token) redirect("/");
  });

  return <>Teams</>;
}
