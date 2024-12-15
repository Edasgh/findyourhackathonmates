import NotFound from "@/components/not-found";
import { use } from "react";

export default function Teams({searchParams}) {
  const {id} = use(searchParams);
  if(!id) return <NotFound/>;
  
  return <>Teams</>;
}
