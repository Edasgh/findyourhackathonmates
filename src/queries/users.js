"use server";
import {verifyToken } from "@/lib/verifyToken";


import User from "@/model/user-model";


export async function getLoggedInUser()
{
   const userId = await verifyToken();
   try {
    const user = await User.findById(userId).select("-password");
    return user;
   } catch (error) {
     throw new Error(error.message)
   }

    
}