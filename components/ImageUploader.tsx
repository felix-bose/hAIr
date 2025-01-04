"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, Loader2 } from "lucide-react";
import Image from "next/image";
import LoadingAnimation from "./LoadingAnimation";

export default function ImageUploader() {
  const [images, setImages] = useState<File[]>([]);
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("prompt", prompt);
      images.forEach((image) => formData.append("images", image));

      const response = await fetch("/api/process-images", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data.result);
    } catch (error) {
      console.error("Error processing images:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Images</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-square rounded-lg overflow-hidden bg-gray-800"
              >
                <Image
                  src={URL.createObjectURL(image)}
                  alt={`Upload ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
            <label className="relative aspect-square rounded-lg border-2 border-dashed border-gray-600 hover:border-gray-500 cursor-pointer flex items-center justify-center bg-gray-800">
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <div className="text-center">
                <ImagePlus className="mx-auto h-12 w-12 text-gray-400" />
                <span className="mt-2 block text-sm text-gray-400">
                  Add Images
                </span>
              </div>
            </label>
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
          disabled={loading || images.length === 0 || !prompt}
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

      {result && !loading && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Result</h2>
          <p className="text-gray-300 whitespace-pre-wrap">{result}</p>
        </div>
      )}
    </div>
  );
}