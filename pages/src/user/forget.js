import * as React from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import axios from "axios"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import FlightLogo from '../../../asssets/FlightLogo.png'
import Image from 'next/image'

const theme = createTheme()

export default function Forget() {
  const router = useRouter()
  const handleSubmit = async (event) => {
    event.preventDefault()
    const result = new FormData(event.currentTarget)
    // eslint-disable-next-line no-console

    try {
      const email = result.get("email")

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      const { data } = await axios.post(`/api/user/forget`, { email }, config)
      toast.success(data.message)
    //  router.push("/login")
    } catch (error) {
      toast.error(error?.response?.data?.error)
    }
  }

  return (
     <>
       <Container component="main" maxWidth="xs">
         <CssBaseline />
         <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
  
           <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
             <Grid container spacing={2}>
               <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
               <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: "secondary.main" }}
              >
                Submit
               </Button>
            
             </Grid>
           </Box>
         </Box>
       </Container>
     </>
  )
}
