import { NextResponse } from "next/server";
import {connectMongoDB} from "../../../lib/mongoDb.js"
import User from "../../../models/user.js"
import bcrypt from "bcryptjs"
export const POST = async (req) => {
    try {
        
        const { name, email, password } = await req.json();
        
        const hashedPassword = await bcrypt.hash(password, 10)

        await connectMongoDB();
        await User.create({name, email, password: hashedPassword})
        return NextResponse.json({message: "User registered", name: name, email: email}, { status: 201 }, );
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json(
            { message: "Error occurred while registering user" },
            { status: 500 }
        );
    }
};
