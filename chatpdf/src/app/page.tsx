import { Button } from "@/components/ui/button";
import { UserButton, auth } from "@clerk/nextjs";
import { LogIn } from "lucide-react";
import Link from "next/link";
import FileUpdate from "@/components/FileUpdate";

export default async function Home() {
  const { userId } = await auth();
  const isAuth = !!userId;

  
  return (
    <div className="w-screen min-h-screen bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-yellow-200 via-emerald-200 to-yellow-200">

      <div className="absolute top-1/2 left-1/2 ">

        <div className="flex flex-col text-center">

          <div className="flex items-center">

            <h1 className="mr-3 text-2xl font-semibold">Chat whit your pdf</h1>

            <UserButton afterSignOutUrl="/" />

          </div>
          
          <div className="w-full mt-4 mb-4">
            {isAuth && <Button>Go to chat</Button> }
          </div>
          <p>want to improve your text?</p>

          <div className="w-full mt-4">
            {isAuth?(<FileUpdate/>):(<Link href="/sign-in"><Button>Login<LogIn className="ml-2"/></Button></Link>)}
          </div>

          </div>

      </div>

    </div>
  
  );
}
