import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { parseCookies } from "nookies"
import { useRouter } from "next/router"
import Link from "next/link"

import { useSession, signOut } from "next-auth/react"
import cookie from "js-cookie"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"

export default function ButtonAppBar() {
  const cookies = parseCookies()
  const router = useRouter()
  const [userState, setUserState] = useState("")
  const [isLoggedIn, setisLoggedIn] = useState(true)

  const { data: session } = useSession()


  const user = cookies?.user
    ? JSON.parse(cookies.user)
    : session?.user
    ? session?.user
    : ""

  console.log(userState)
  useEffect(() => {
    console.log('setting user state')

     setUserState(user)
  }, [router, setUserState])
  const { token } = router.query
//console.log(router)
  useEffect(() => {
    if (user) {
      console.log('user is there')
      setisLoggedIn(true)
    }
    if (!user) {
      if(router.pathname == '/src/user/reset/[...token]')
      {
        console.log('tpoken is there')

      }
      else {
        console.log(router.pathname)

        router.push("/src/user/login")
      }
    }
  }, [isLoggedIn])

  const logoutHandler = async () => {
    if (session) {
      signOut()
    }
    cookie.remove("token")
    cookie.remove("user")
    console.log('setting login state')

    setisLoggedIn(false)
    setUserState("")
  }

  return (
     <Box sx={{ flexGrow: 1 }}>
       <AppBar position="static">
         <Toolbar>
           <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            AuthApp
           </Typography>
           <Link href="/src/user/profile">
             <Button color="inherit">{userState && userState.name} </Button>
           </Link>

           <Box sx={{ ml: 2 }}>
            {userState ? (
               <>
                 <Button color="inherit" onClick={logoutHandler}>
                  Logout
                 </Button>
               </>
            ) : (
               <>
                 <Link href="/src/user/login">
                   <Button color="inherit">Login </Button>
                 </Link>
                 <Link href="/src/user/register">
                   <Button color="inherit">Register </Button>
                 </Link>
               </>
            )}
           </Box>
         </Toolbar>
       </AppBar>
     </Box>
  )
}
