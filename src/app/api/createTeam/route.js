import { NextResponse } from "next/server";
import { dbConn } from "@/lib/mongo";

import Team from "@/model/team-model";

export const POST = async (request) => {
  const { name, email, description, members, admins, skills,links } =
    await request.json();

  //db connection
  await dbConn();

  //create a team
  const tm = {
    name,
    email,
    description,
    members,
    admins,
    skills,
    links,
  };

  try {
    await Team.create(tm);
  } catch (error) {
    console.log(error);
    return new NextResponse(error.message, {
      status: 500,
    });
  }

  //return a success response
  return new NextResponse("Created new team successfully!", {
    status: 201,
  });
};


export const GET = async(request)=>{
  //dbConn
  await dbConn();

  try {
    const teams = await Team.find({});
    if(teams)
    {
      return NextResponse.json({teams:teams},{status:200})
    }
  } catch (error) {
     console.log(error);
     return new NextResponse(error.message, {
       status: 500,
     });
  }
}