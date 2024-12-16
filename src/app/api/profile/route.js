import { dbConn } from "@/lib/mongo";
import { getLoggedInUser } from "@/queries/users";
import { NextResponse } from "next/server";

export const GET = async () => {
  //dbconn
  await dbConn();

  try {
    const user = await getLoggedInUser();
    if(user)
    {
      const resp= NextResponse.json(user, { status: 200 });
      return resp;
    }
    else
    {
       return new NextResponse("Something went wrong!", {
         status: 500,
       });
    }
  } catch (error) {
    console.log(error);
    return new NextResponse(error.message, {
      status: 500,
    });
  }

};
