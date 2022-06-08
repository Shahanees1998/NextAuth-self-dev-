import { createTheme } from "@mui/material/styles"
import { red } from "@mui/material/colors"

const theme = createTheme({
  palette: {
    primary: {
      main: "#815aa1",
    },
    secondary: {
      main: "#e7dfed",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
})

export default theme
