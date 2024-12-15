"use server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";


const jwt_secret = String(process.env.JWT_SECRET);


export const verifyToken = async()=>{
  
      const {name,value,path} = (await cookies()).get("token");
      const data = jwt.verify(value,jwt_secret);
      const userId = data.id;
      return userId;
}

export const getToken = async()=>{
       const { name, value, path } = (await cookies()).get("token");
       return value;
}