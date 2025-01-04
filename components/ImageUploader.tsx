"use client"

import { useState } from "react"
import { Textarea, Button, Input } from "@/components/ui"
import { ImagePlus, Loader2, XIcon } from "lucide-react"
import Image from "next/image"
import LoadingAnimation from "./LoadingAnimation"
import type { Image as TImage } from "openai/resources/images.mjs"

export default function ImageUploader() {
  const [image, setImage] = useState<File>()
  const [outputImage, setOutputImage] = useState<TImage>()
  const [prompt, setPrompt] = useState("")
  const [loading, setLoading] = useState(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData()
      formData.append("prompt", prompt)
      formData.append("image", image ?? new Blob())

      const response = await fetch("/api/process-images", {
        method: "POST",
        body: formData,
      })

      const data = (await response.json()) as { image: TImage }
      console.log("Output image:", data.image)

      setOutputImage(data.image)
    } catch (error) {
      console.error("Error processing images:", error)
    } finally {
      setLoading(false)
    }
  }

  // TODO the image doesn't get altered for some reason we should maybe try with a different test image to figure out whats causing the issue

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Image</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {image ? (
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-800">
                <Image
                  src={URL.createObjectURL(image)}
                  alt={`Uploaded image: ${image.name}`}
                  fill
                  className="object-cover"
                />

                <span className="absolute top-0 left-0 bg-gray-800 text-gray-400 p-1">
                  {image.name}
                </span>
                <span>
                  <Button
                    onClick={() => setImage(undefined)}
                    variant="destructive"
                    size="sm"
                    className="absolute top-0 right-0 flex items-center gap-x-1"
                  >
                    <XIcon className="size-3" />
                  </Button>
                </span>
              </div>
            ) : (
              <label className="relative aspect-square rounded-lg border-2 border-dashed border-gray-600 hover:border-gray-500 cursor-pointer flex items-center justify-center bg-gray-800">
                <Input
                  type="file"
                  multiple={false}
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <div className="text-center">
                  <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                  <span className="mt-2 block text-sm text-gray-400">Add Image</span>
                </div>
              </label>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Prompt</label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your prompt for the AI..."
            className="h-32 bg-gray-800 border-gray-700"
          />
        </div>

        <Button
          type="submit"
          disabled={loading || !image || !prompt}
          className="w-full"
        >
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Process Images"
          )}
        </Button>
      </form>

      {loading && <LoadingAnimation />}

      {!loading && outputImage?.url && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Result</h2>
          <Image
            src={outputImage.url}
            alt="Output image"
            width={512}
            height={512}
            className="rounded-lg"
          />
        </div>
      )}
    </div>
  )
}
