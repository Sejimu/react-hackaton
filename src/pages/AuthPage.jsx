import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useAuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";

const defaultTheme = createTheme();

export default function AuthPage() {
  const [isLogin, setIsLogin] = React.useState(true);
  const { user, register, login } = useAuthContext();
  const { users, getUsers, addUser } = useUserContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);

    if (isLogin) {
      login(data.get("email"), data.get("password"));
    } else {
      register(
        data.get("email"),
        data.get("password"),
        data.get("displayName"),
        data.get("photoURL"),
        data.get("phone")
      );
      const newUser = {
        email: data.get("email"),
        name: data.get("displayName"),
        photoURL: data.get("photoURL"),
        phone: data.get("phone"),
      };
      addUser(newUser);
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        component="main"
        maxWidth="xs"
        sx={{ height: "100vh", paddingTop: "30px" }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>

          <Typography component="h1" variant="h5" sx={{ color: "#DAFFFB" }}>
            {isLogin ? "Sign in" : "Sign up"}
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {!isLogin && (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Full name"
                  name="displayName"
                  autoFocus
                  sx={{ backgroundColor: "#64CCC5" }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="image"
                  label="Photo"
                  name="photoURL"
                  sx={{ backgroundColor: "#64CCC5" }}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="phone"
                  label="phone"
                  name="phone"
                  sx={{ backgroundColor: "#64CCC5" }}
                />
                phone
              </>
            )}

            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              sx={{ backgroundColor: "#64CCC5" }}
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
              sx={{ backgroundColor: "#64CCC5" }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: "#DAFFFB",
                color: "#001C30",
              }}
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link
                  onClick={() => setIsLogin((prev) => !prev)}
                  href="#"
                  variant="body2"
                >
                  {isLogin
                    ? "Don't have an account? Sign Up"
                    : "Already have an account? Sign In"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
