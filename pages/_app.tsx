import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { Theme } from '@/themes/theme'

export default function App({ Component, pageProps }: AppProps) {
  return (
  <ThemeProvider theme={Theme}>
    <CssBaseline />
    <Component {...pageProps} />
  </ThemeProvider>)
}
