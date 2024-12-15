import { NextResponse } from "next/server";
import { dbConn } from "@/lib/mongo";

import Team from "@/model/team-model";

export const POST = async (request) => {
  const { name, email, description, members, admins, skills } =
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
  };

  try {
    await Team.create(tm);
  } catch (error) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }

  //return a success response
  return new NextResponse("Created new team successfully!", {
    status: 201,
  });
};
