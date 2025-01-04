import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const prompt = data.get("prompt") as string;
    const images = data.getAll("images") as File[];

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    const imageContents = await Promise.all(
      images.map(async (image) => {
        const bytes = await image.arrayBuffer();
        return {
          inlineData: {
            data: Buffer.from(bytes).toString("base64"),
            mimeType: image.type,
          },
        };
      })
    );

    const result = await model.generateContent([prompt, ...imageContents]);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ result: text });
  } catch (error) {
    console.error("Error processing images:", error);
    return NextResponse.json(
      { error: "Failed to process images" },
      { status: 500 }
    );
  }
}