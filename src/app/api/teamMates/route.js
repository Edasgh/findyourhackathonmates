import { NextResponse } from "next/server";
import { dbConn } from "@/lib/mongo";

import User from "@/model/user-model";

export const GET = async(request)=>{
    //dbConn
    await dbConn();
   
    try {
       const users = await User.find({});
       if(users)
       {
         return NextResponse.json({ users }, { status: 200 });
       }
    } catch (error) {
        console.log(error);
        console.log(error.message);
        return new NextResponse(error.message, {
          status: 500,
        });
    }
}
