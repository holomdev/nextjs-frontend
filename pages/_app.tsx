import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

import type { AppProps } from 'next/app'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { Theme } from '@/themes/theme'
// --------------------------------------------------
import { SessionProvider } from "next-auth/react"
import type { Session } from "next-auth"
// --------------------------------------------------
import { ToastContainer } from 'react-toastify'


export default function App({
  Component,
  pageProps:
  { session, ...pageProps }
}: AppProps<{ session: Session }>) {
  return (
    <ThemeProvider theme={Theme}>
      <SessionProvider session={session}>
        <ToastContainer position="top-right" autoClose={6000} theme="colored" />
        <CssBaseline />
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>)
}
