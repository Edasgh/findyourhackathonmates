import { NextResponse } from "next/server";
import { dbConn } from "@/lib/mongo";

import User from "@/model/user-model";

export const GET = async(request)=>{
    //dbConn
    await dbConn();

     const url = request.url;
     const params = new URLSearchParams(new URL(url).search);
     const id = params.get("id");
   
    try {
       const users = await User.find({_id:{$ne:id}});
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
