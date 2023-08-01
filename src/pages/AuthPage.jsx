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
        sx={{
          minHeight: "100vh",
          paddingTop: "30px",
          backgroundColor: "#D8D9DA", // Background color for the container
        }}
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
          <Typography
            component="h1"
            variant="h5"
            sx={{ color: "black", mb: 2 }} // Set margin bottom to create space between heading and form
          >
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
                <input
                  placeholder="Name"
                  required
                  name="displayName"
                  autoFocus
                  style={{
                    minWidth: "250px",
                    width: "40vw",
                    height: "40px",
                    border: "none",
                    color: "white",
                    backgroundColor: "#272829",
                    marginBottom: "5px",
                    paddingLeft: "5px",
                    borderRadius: "5px",
                  }}
                />

                <input
                  placeholder="Photo"
                  required
                  name="photoURL"
                  style={{
                    minWidth: "250px",
                    width: "40vw",
                    height: "40px",
                    border: "none",
                    color: "white",
                    backgroundColor: "#272829",
                    marginBottom: "5px",
                    paddingLeft: "5px",
                    borderRadius: "5px",
                  }}
                />

                <input
                  placeholder="Phone"
                  required
                  name="phone"
                  type="number"
                  style={{
                    minWidth: "250px",
                    width: "40vw",
                    height: "40px",
                    border: "none",
                    color: "white",
                    backgroundColor: "#272829",
                    marginBottom: "5px",
                    paddingLeft: "5px",
                    borderRadius: "5px",
                  }}
                />
              </>
            )}

            <input
              placeholder="Email"
              required
              name="email"
              style={{
                minWidth: "250px",
                width: "40vw",
                height: "40px",
                border: "none",
                color: "white",
                backgroundColor: "#272829",
                marginBottom: "5px",
                paddingLeft: "5px",
                borderRadius: "5px",
              }}
            />

            <input
              placeholder="Password"
              required
              name="password"
              type="password"
              style={{
                minWidth: "250px",
                width: "40vw",
                height: "40px",
                border: "none",
                color: "white",
                backgroundColor: "#272829",
                marginBottom: "5px",
                paddingLeft: "5px",
                borderRadius: "5px",
              }}
            />

            <button
              type="submit"
              style={{
                color: "white",
                backgroundColor: "#272829",
                minWidth: "250px",
                width: "40vw",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                outline: "none",
                height: "40px",
                backgroundColor: "#61677A",
              }}
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </button>

            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link
                  onClick={() => setIsLogin((prev) => !prev)}
                  href="#"
                  variant="body2"
                  sx={{ color: "black" }} // Text color for the link
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
