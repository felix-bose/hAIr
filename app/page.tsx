import { auth } from "@/auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui"
import ImageUploader from "@/components/ImageUploader"
import { SignIn } from "@/components/SignIn"
import { SignOut } from "@/components/Signout"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { getFirstNameAndLastInitial } from "@/lib/utils"

export default async function Home() {
  const session = await auth()
  const { user } = session ?? {}

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-left mb-8">h-AI-radvisor</h1>
            {user ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage src={user.image ?? ""} alt="user avatar" />
                    <AvatarFallback>
                      {getFirstNameAndLastInitial(user?.name)}
                    </AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="absolute right-0 w-min p-2 bg-gray-800">
                  <SignOut />
                </PopoverContent>
              </Popover>
            ) : null}
          </div>
          {!session ? (
            <div className="text-left">
              <p className="mb-8 text-lg text-gray-300">
                Sign in to start processing your images with AI
              </p>
              <SignIn />
            </div>
          ) : (
            <ImageUploader />
          )}
        </div>
      </div>
    </main>
  )
}
