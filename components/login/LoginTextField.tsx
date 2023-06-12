import { TextField } from '@mui/material'
import { ComponentProps, FunctionComponent } from 'react'
import { Control, ControllerRenderProps, FieldPath, useController } from 'react-hook-form'

export type LoginFormValues = {
  email: string
  password: string
};

type UserInfoTextFieldProps = {
  name: FieldPath<LoginFormValues>
  label: string
  control: Control<LoginFormValues>
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
} & Omit<ComponentProps<typeof TextField>, keyof ControllerRenderProps>

export const LoginTextField: FunctionComponent<UserInfoTextFieldProps> = ({ name, control, onChange, ...rest }) => {
  const { field: { ref, onChange: controllerOnChange, ...inputProps }, fieldState: { error } } = useController({ name, control, defaultValue: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    controllerOnChange(e)
    if (onChange) {
      onChange(e)
    }
  }

  return <TextField
    {...inputProps}
    {...rest}
    error={!!error}
    helperText={error?.message}
    ref={ref}
    sx={{ marginBottom: '25px', height: 57 }}
    fullWidth
    variant='outlined'
    autoComplete="off"
    onChange={handleChange}
  />
}
