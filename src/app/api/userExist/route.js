import { NextResponse } from "next/server";
import {connectMongoDB} from "../../../lib/mongoDb.js"
import User from "../../../models/user.js"
export const POST = async (req) => {
    try {
        
        const {email} = await req.json();
        await connectMongoDB();
        const data = await User.findOne({email})
        const emailData = data.email
        return NextResponse.json({emailData});
    } catch (error) {
        return NextResponse.json(
            { message: "Error occurred while exosting user user" },
            { status: 500 }
        );
    }
};
