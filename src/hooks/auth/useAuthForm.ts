import { AxiosError } from "axios"
import { useRouter } from "next/router"
import { ChangeEvent, useState } from "react"
import { useUserStore } from "../../stores/user-store/userStore"
import { AuthResponse, ServerErrorResponse } from "../../types/apiResponse"

export type Values = {
  email: string
  password: string
  confirmPassword?: string
  username?: string
}

export type ValidationErrors = Partial<Values>

interface UseAuthForm {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (e: ChangeEvent<HTMLFormElement>) => void
  values: Values
  validationErrors: ValidationErrors
  serverError: string
  isLoading: boolean
}

export function useAuthForm(
  initialValues: Values,
  validate: (values: Values) => ValidationErrors,
  url: string
): UseAuthForm {
  const router = useRouter()
  const [values, setValues] = useState<Values>(initialValues)
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [serverError, setServerError] = useState<string>("")

  const { setUser, setAccessToken, setRefreshToken } = useUserStore.getState()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validationErrors = validate(values)
    if (Object.keys(validationErrors).length === 0) {
      setIsLoading(true)
      try {
        // const {
        //   data: { user, accessToken, refreshToken },
        // } = await axiosInstance.post<AuthResponse>(url, values)
        // resolve, reject를 통해 흉내낸 Promise
        const {
          data: { user, accessToken, refreshToken },
        } = await mockResolve()
        // mockReject()

        setUser(user)
        setAccessToken(accessToken)
        setRefreshToken(refreshToken)

        router.push(typeof router.query.next === "string" ? router.query.next : "/")
      } catch (err) {
        const axiosError = err as AxiosError<ServerErrorResponse>
        setServerError(axiosError.response?.data?.message || "에러 발생, 관리자에게 문의 바랍니다.")
      } finally {
        setIsLoading(false)
      }
    } else {
      setValidationErrors(validationErrors)
    }
  }

  return { handleChange, handleSubmit, values, validationErrors, serverError, isLoading }
}

const mockResolve = async () => {
  return await new Promise<{ data: AuthResponse }>((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          user: { id: "userId", name: "user123", email: "user123@example.com" },
          accessToken: "fake-access-token",
          refreshToken: "fake-refresh-token",
        },
      })
    }, 2000) // 1초 지연
  })
}

const mockReject = async () => {
  await new Promise((_, reject) => {
    setTimeout(() => {
      reject(new Error("Authentication failed"))
    }, 1000) // 1초 지연
  })
}
