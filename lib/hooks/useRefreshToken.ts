"use client"
import { useSession } from "next-auth/react"
import axios from "../axios"

export const useRefreshToken = () => {
  const { data: session, update } = useSession()
  const refreshToken = async () => {
    const res = await axios.post("/authentication/refresh-tokens", {
      refreshToken: session?.user.refreshToken
    })

    if(session) {
      session.user.accessToken = res.data.accessToken
      await update({
        ...session,
        user: {
          ...session.user,
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
        }
      })
    }
  }

  return refreshToken
}
