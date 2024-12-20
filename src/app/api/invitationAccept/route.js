// Description: This file defines the routes for invitation accept API.
import { NextResponse } from "next/server";
import { dbConn } from "@/lib/mongo";

import Request from "@/model/request-model";

import Team from "@/model/team-model";
import User from "@/model/user-model";

export const POST = async (request) => {
  const { message, senderName, senderId, teamId, recieverName, recieverId } =
    await request.json();
  await dbConn();
  //invitation or application
  const isInvitation = message.includes("invited you to join");
  try {
    if (isInvitation) {
      //find the request
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
      //update the team
      const updateTeam = await Team.findByIdAndUpdate(teamId, {
        $push: {
          members: {
            name: recieverName,
            id: recieverId,
          },
        },
      });
      if (!updateTeam) {
        throw new Error("Team not updated!");
      }
      //update the user
      const updateUser = await User.findByIdAndUpdate(recieverId, {
        $push: {
          teams: teamId,
        },
      });
      if (!updateUser) {
        throw new Error("User not updated!");
      }
    } else {
      //application accepting
      //find the request
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
      //update the team
      // here the sender will be added to the team if application is accepted
      const updateTeam = await Team.findByIdAndUpdate(teamId, {
        $push: {
          members: {
            name: senderName,
            id: senderId,
          },
        },
      });
      if (!updateTeam) {
        throw new Error("Team not updated!");
      }
      //update the user
      //update the sender's teams
      const updateUser = await User.findByIdAndUpdate(senderId, {
        $push: {
          teams: teamId,
        },
      });
      if (!updateUser) {
        throw new Error("User not updated!");
      }
    }
  } catch (error) {
    console.log(error.message);
    return new NextResponse(error.message, {
      status: 500,
    });
  }

  return new NextResponse("Request accepted!", { status: 200 });
};
