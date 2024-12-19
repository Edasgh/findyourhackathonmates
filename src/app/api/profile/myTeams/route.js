import { dbConn } from "@/lib/mongo";
import Team from "@/model/team-model";
import { NextResponse } from "next/server";

export const GET = async (request) => {
  await dbConn();
  const url = request.url;
  const params = new URLSearchParams(new URL(url).search);
  const id = params.get("id");

  try {
    const teams = await Team.find({ members: { $in: [id] } });
    if (teams) {
      return NextResponse.json(teams, { status: 200 });
    }
  } catch (error) {
    console.log(error);
    console.log(error.message);
    return new NextResponse("Something went wrong!", {
      status: 500,
    });
  }
};
