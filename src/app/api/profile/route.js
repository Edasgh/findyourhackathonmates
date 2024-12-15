import { dbConn } from "@/lib/mongo";
import { getLoggedInUser } from "@/queries/users";
import { NextResponse } from "next/server";

export const GET = async () => {
  //dbconn
  await dbConn();

  try {
    const user = await getLoggedInUser();
    const resp= NextResponse.json(user, { status: 200 });
    resp.cookies.set("user",JSON.stringify(user));
    return resp;
  } catch (error) {
    console.log(error);
    return new NextResponse(error.message, {
      status: 500,
    });
  }

};
