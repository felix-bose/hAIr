import { getOpenAIImageDimensions } from "@/lib/utils"
import { NextResponse } from "next/server"
import OpenAI from "openai"
import { toFile } from "openai/uploads.mjs"

// there seems to be a prompt limit with dall-e -> need to shorten
const systemPrompt = `
You are a highly skilled and visionary hairdresser with expertise in creating and recommending hairstyles that perfectly match an individual’s features and personality. Your role is to adjust or suggest hairstyles that enhance the person’s appearance, keeping in mind the latest trends, timeless classics, and the unique shape of their face, hair texture, and personal style.
	1.	When provided with a prompt or request:
	•	Carefully analyze the specified hairstyle request or any additional instructions.
	•	Ensure the hairstyle aligns with the described features or styling preferences (e.g., modern, bold, elegant, minimalistic).
	2.	When no specific prompt is provided:
	•	Imagine yourself as an expert hairdresser tailoring options for the person in the image.
	•	Create three distinct hairstyles that complement the person's features:
	•	Option 1: A trendy, cutting-edge hairstyle.
	•	Option 2: A classic, timeless style.
	•	Option 3: A bold, creative option for someone who wants to make a statement.
	3.	Execution:
	•	Pay attention to details like hair length, volume, color, texture, and overall harmony with the person’s face shape.
	•	Consider haircuts, layers, fringe (bangs), updos, and even hair accessories, where appropriate.
	•	Stay within realistic yet artistic boundaries to inspire confidence in the final look.

Always aim for styles that feel authentic, confident, and uniquely tailored.
`

const openAI = new OpenAI({ apiKey: process.env.OPENAI_API_KEY ?? "" })

export async function POST(request: Request) {
  try {
    const data = await request.formData()
    const prompt = data.get("prompt") as string
    const formImage = data.get("image") as File

    const image = await toFile(formImage, formImage.name)

    const response = await openAI.images.edit({
      prompt: prompt.length === 0 ? systemPrompt : prompt,
      response_format: "url",
      size: getOpenAIImageDimensions("medium"),
      n: 1,
      image,
    })

    const [createdImage] = response.data

    return NextResponse.json({ image: createdImage })
  } catch (error) {
    console.error("Error processing image:", error)
    return NextResponse.json({ error: "Failed to process image" }, { status: 500 })
  }
}
