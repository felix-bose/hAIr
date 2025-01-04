import { auth } from "@/auth";
import LoginButton from "@/components/LoginButton";
import ImageUploader from "@/components/ImageUploader";

export default async function Home() {
  const session = await auth();

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">
            AI Image Processing
          </h1>
          {!session ? (
            <div className="text-center">
              <p className="mb-8 text-lg text-gray-300">
                Sign in to start processing your images with AI
              </p>
              <LoginButton />
            </div>
          ) : (
            <ImageUploader />
          )}
        </div>
      </div>
    </main>
  );
}