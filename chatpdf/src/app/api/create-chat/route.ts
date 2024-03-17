import { NextResponse } from "next/server";

export async function POST(req: Request, res: Response) {
    try {
        const { file_key, file_name } = await req.json();

        if (!file_key || !file_name) {
            throw new Error("Invalid request body");
        }

        return NextResponse.json({ message: "success"}, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "internal server error" }, { status: 500 });
    }
}
