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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const loginSchema = z.object({
  email: z
    .string({ required_error: "이메일을 입력하세요" })
    .email({ message: "올바른 이메일 형식이 아닙니다"}),
  password: z
    .string({ required_error: "비밀번호를 입력하세요" })
    .min(6, { message: "비밀번호는 6자 이상이어야 합니다" }),
});

const signupSchema = z.object({
  username: z
    .string({ required_error: "이름을 입력하세요" }),
  email: z
    .string({ required_error: "이메일을 입력하세요" })
    .email({ message: "올바른 이메일 형식이 아닙니다"}),
  password: z
    .string({ required_error: "비밀번호를 입력하세요" })
    .min(6, { message: "비밀번호는 6자 이상이어야 합니다" }),
  passwordConfirm: z
    .string({ required_error: "비밀번호를 입력하세요" })
    .min(6, { message: "비밀번호는 6자 이상이어야 합니다" })
}).refine(data => data.password === data.passwordConfirm, {
  message: "비밀번호가 일치하지 않습니다",
  path: ["passwordConfirm"],
});

type loginForm = z.infer<typeof loginSchema>;
type signupForm = z.infer<typeof signupSchema>;

function LogInForm({close}:{close: () => void}) {
  const loginForm = useForm<loginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  const signupForm = useForm<signupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirm: "",
    }
  })

  const onLoginSubmit = (data: loginForm) => {
    console.log(data);
  }

  const onSignupSubmit = (data: signupForm) => {
    console.log(data);
  }

  return (
    <div className="absolute flex justify-center items-center w-full h-screen z-40 bg-black bg-opacity-70">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="login">로그인</TabsTrigger>
          <TabsTrigger value="signup">회원가입</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
        <Form {...loginForm}>
          <form onSubmit={loginForm.handleSubmit(onLoginSubmit)}>
            <Card className="relative w-96">
              <CardHeader>
                <CardTitle>로그인</CardTitle>
              </CardHeader>
              <div className="absolute top-3 right-4 cursor-pointer" onClick={close}>X</div>
              <CardContent className="flex flex-col gap-3 my-5">
                <div className="px-1 text-sm font-semibold">이메일</div>
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="이메일을 입력하세요" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="px-1 text-sm font-semibold">비밀번호</div>
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="비밀번호를 입력하세요" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex justify-center w-full">
                <Button>로그인</Button>
              </CardFooter>
            </Card>
          </form>
        </Form>
        </TabsContent>
        <TabsContent value="signup">
          <Form {...signupForm}>
            <form onSubmit={signupForm.handleSubmit(onSignupSubmit)}>
              <Card className="relative w-96">
                <CardHeader>
                  <CardTitle>회원가입</CardTitle>
                </CardHeader>
                <div className="absolute top-3 right-4 cursor-pointer" onClick={close}>X</div>
                <CardContent className="flex flex-col gap-3 my-5">
                  <div className="px-1 text-sm font-semibold">이름</div>
                  <FormField
                    control={signupForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="이름을 입력하세요" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="px-1 text-sm font-semibold">이메일</div>
                  <FormField
                    control={signupForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="이메일을 입력하세요" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="px-1 text-sm font-semibold">비밀번호</div>
                  <FormField
                    control={signupForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="비밀번호를 입력하세요" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="px-1 text-sm font-semibold">비밀번호 확인</div>
                  <FormField
                    control={signupForm.control}
                    name="passwordConfirm"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="비밀번호를 다시 입력해주세요" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex justify-center w-full">
                  <Button>회원가입</Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
    
    
  );
}

export default LogInForm;