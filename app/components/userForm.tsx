import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

function LogInForm({close}:{close: () => void}) {
  return (
    <form className="absolute flex justify-center items-center w-full h-screen z-40 bg-black bg-opacity-70">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="login">LogIn</TabsTrigger>
          <TabsTrigger value="signup">SignUp</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card className="relative w-96">
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Please enter your email and password.</CardDescription>
            </CardHeader>
            <div className="absolute top-3 right-4 cursor-pointer" onClick={close}>X</div>
            <CardContent className="flex flex-col gap-3">
              <Input placeholder="email" />
              <Input placeholder="password" />
            </CardContent>
            <CardFooter className="flex justify-center w-full">
              <Button>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="signup">
          <Card className="relative w-96">
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>Please enter your username, email and password.</CardDescription>
            </CardHeader>
            <div className="absolute top-3 right-4 cursor-pointer" onClick={close}>X</div>
            <CardContent className="flex flex-col gap-3">
              <Input placeholder="userName" />
              <Input placeholder="email" />
              <Input placeholder="password" />
              <Input placeholder="confirm password" />
            </CardContent>
            <CardFooter className="flex justify-center w-full">
              <Button>Signup</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  );
}

export default LogInForm;