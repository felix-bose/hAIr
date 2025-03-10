import { signIn } from "@/auth"

export const SignIn = () => {
  return (
    <form
      action={async () => {
        "use server"
        await signIn("google")
      }}
    >
      <button
        className="flex justify-center gap-5 rounded bg-white px-4 py-4 text-sm font-bold drop-shadow-md hover:bg-gray-50"
        type="submit"
      >
        <GoogleIcon />
        <div className="text-gray-800 text-sm font-medium">Signin with Google</div>
      </button>
    </form>
  )
}

const GoogleIcon = () => {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5 fill-none" role="img">
      <path
        d="M18.7846 10.2789C18.7846 9.66221 18.7346 9.04221 18.628 8.43555H10.0713V11.9289H14.9713C14.768 13.0555 14.1146 14.0522 13.158 14.6855V16.9522H16.0813C17.798 15.3722 18.7846 13.0389 18.7846 10.2789Z"
        fill="#4285F4"
      />
      <path
        d="M10.0715 19.1429C12.5182 19.1429 14.5815 18.3396 16.0848 16.9529L13.1615 14.6862C12.3482 15.2396 11.2982 15.5529 10.0748 15.5529C7.70818 15.5529 5.70151 13.9562 4.98151 11.8096H1.96484V14.1462C3.50484 17.2096 6.64151 19.1429 10.0715 19.1429Z"
        fill="#34A853"
      />
      <path
        d="M4.97833 11.81C4.59833 10.6833 4.59833 9.46333 4.97833 8.33667V6H1.965C0.678333 8.56333 0.678333 11.5833 1.965 14.1467L4.97833 11.81Z"
        fill="#FBBC04"
      />
      <path
        d="M10.0715 4.59061C11.3648 4.57061 12.6148 5.05728 13.5515 5.95061L16.1415 3.36061C14.5015 1.82061 12.3248 0.973945 10.0715 1.00061C6.64151 1.00061 3.50484 2.93394 1.96484 6.00061L4.97818 8.33728C5.69484 6.18728 7.70484 4.59061 10.0715 4.59061Z"
        fill="#EA4335"
      />
    </svg>
  )
}
