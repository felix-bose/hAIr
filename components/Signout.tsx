import { signOut } from "@/auth"
import { LogOutIcon } from "lucide-react"
import { Button } from "./ui"

export const SignOut = () => {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <Button
        type="submit"
        variant="ghost"
        className="flex items-center gap-x-2 text-destructive hover:text-destructive/90 ring-offset-0"
      >
        <LogOutIcon className="size-4" />
        Sign Out
      </Button>
    </form>
  )
}
