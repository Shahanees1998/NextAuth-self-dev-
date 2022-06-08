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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { useState, useEffect } from "react"
import axios from "axios"
import cookie from "js-cookie"
import { useSession, signIn, signOut, getSession } from "next-auth/react"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { parseCookies } from "nookies"
import { GoogleLoginButton } from "react-social-login-buttons"

const theme = createTheme()

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const cookies = parseCookies()

  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      toast.success("Login Success")
      router.push("/")
    }

    if (cookies?.user) {
      router.push("/")
    }
  }, [router, session])

  const SubmitHandler = async (e) => {
    e.preventDefault()

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      const { data } = await axios.post(
        `/api/user/login`,
        { email, password },
        config
      )

      toast.success(data.message)
      cookie.set("token", data?.token)
      cookie.set("user", JSON.stringify(data?.user))
      router.push("/")
    } catch (error) {
      toast.error(error.response.data.error)
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
            noValidate
            sx={{ mt: 1 }}
            onSubmit={SubmitHandler}
          >
             <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
             <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

         
               <GoogleLoginButton onClick={() => signIn("google")} />
  

             <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2, backgroundColor: "secondary.main" }}
            >
              Sign In
             </Button>
             <Grid container>
               <Grid item xs>
               <button onClick={() => router.push('/src/user/forget')}>
                  Forgot password?
                 </button>
               </Grid>
               <Grid item>
                 <button onClick={() => router.push('/src/user/register')}>
                  {"Don't have an account? Sign Up"}
                 </button>
               </Grid>
             </Grid>
           </Box>
         </Box>
       </Container>
     </>
  )
}

// export async function getServerSideProps(context) {
//   const session = await getSession(context)

//   return {
//     props: {
//       session,
//     },
//   }
// }

export async function getServerSideProps(context) {
  const session = await getSession(context)

  return {
    props: {
      session,
    },
  }
}
export default Login
