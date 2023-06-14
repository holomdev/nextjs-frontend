import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

const HomePage = () => {
  const { data: session } = useSession()
  const [data, setData] = useState()

  const fetchGet = async () => {
    const res = await fetch("http://localhost:3500/coffees", {
      method: "Get",
      headers: {
        authorization: `bearer ${session?.user.accessToken}`
      }
    })

    const response = await res.json()
    setData(response)
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Hola, {session?.user?.name}
            </Typography>
            <Button color="inherit" onClick={() => signOut()}>Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Box width="500px" sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography py={3}>Peticion al backend</Typography>
          <Button variant="contained" onClick={fetchGet}>Enviar peticion</Button>
          <Box>
            {data && JSON.stringify(data)}
          </Box>
        </Box>
      </Box>
    </>
  )
}
export default HomePage