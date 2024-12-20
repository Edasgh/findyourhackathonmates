// Description: This file defines the routes for invitation reject API.
import { NextResponse } from "next/server";
import { dbConn } from "@/lib/mongo";

import Request from "@/model/request-model";

export const POST = async (request) => {
  const { senderId, teamId, recieverId } = await request.json();
  await dbConn();

  try {
    const request = await Request.findOne({
      "reciever.id": { $eq: recieverId },
      "team.id": { $eq: teamId },
      "sender.id": { $eq: senderId },
    });
    if (!request) {
      throw new Error("Request not found!");
    }
    //delete the request
    const deleteRequest = await Request.findByIdAndDelete(request._id);
    if (!deleteRequest) {
      throw new Error("Request not deleted!");
    }
  } catch (error) {
    console.log(error.message);
    return new NextResponse(error.message, {
      status: 500,
    });
  }

  return new NextResponse("Request rejected!", { status: 200 });
};
