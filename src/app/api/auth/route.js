import { NextResponse } from "next/server"

export async function POST(
    request
)
    {
        try {
            const { userId, avatarUrl,email } = await request.json();
            console.log(userId, avatarUrl, email);
            //response
            return NextResponse.json (userId)
        } catch (error) {
            console.error(error)
            
        }
    }
