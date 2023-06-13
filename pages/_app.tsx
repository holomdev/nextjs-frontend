import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { Theme } from '@/themes/theme'
// --------------------------------------------------
import { SessionProvider } from "next-auth/react"
import type { Session } from "next-auth"
// --------------------------------------------------

export default function App({ 
  Component, 
  pageProps: 
  { session, ...pageProps }
}: AppProps<{ session: Session }>) {
  return (
    <ThemeProvider theme={Theme}>
      <SessionProvider session={session}>
        <CssBaseline />
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>)
}
