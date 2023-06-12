import { LoginFormValues, LoginTextField } from "@/components/login";
import { manuals, white } from "@/themes/colors";
import { Box, Button, Typography } from "@mui/material";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from "@/utils/validation";

export default function Home() {

  const { control, handleSubmit, reset, formState: { isValid } } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    mode: 'all'
  })

  const onSubmit = async (data: LoginFormValues) => {
    reset()
    console.log(data)
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          bgcolor: manuals[950],
          height: '100vh',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box sx={{ backgroundColor: white, width: '500px', borderRadius: '40px', padding: '30px' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h6" textAlign="center" mt={2} mb={2}>ACME</Typography>
            <LoginTextField name="email" control={control} label={"Correo"} />
            <LoginTextField name="password" control={control} label={"Password"} type="password" />
            <Button type="submit" variant="contained" fullWidth disabled={!isValid}>Iniciar sesión</Button>
          </form>
        </Box>
      </Box>
    </>
  )
}
