import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Grid, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material"
import CustomSnackbar from './CustomSnackbar';
import { UserStorage } from '../utils/userLocalStorageUtils';
import { useNavigate } from '../router';

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = React.useState(false);
  const [snackbarMsg, setSnackBarMsg] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpenSnackbar(false);
  };
  
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const loginInfo = {
    staff: {
      id: 1,
      name: "Tan Ah Gao",
      password: "password",
      sys_role: "staff"
    }, 
    admin: {
      id: 2,
      name: "Vincent Rex Colins",
      password: "password",
      sys_role: "admin"
    },
    manager: {
      id: 3,
      name: "Faud Nizam",
      password: "password",
      sys_role: "manager"
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    const { username, password } = formData;
    if (Object.keys(loginInfo).includes(username)) {
      if (loginInfo[username].password === password) {
        setErrMsg("");
        setOpenSnackbar(true);
        setSnackBarMsg("Login successful");
        UserStorage.addUser(loginInfo[username]);
        navigate(0);
      } else {
        setErrMsg("Incorrect password");
      }
    } else {
      setErrMsg("User not found");
    }
  };

  return (
    <form action="" onSubmit={handleSubmit}>
      <CustomSnackbar
        openSnackbar={openSnackbar}
        handleCloseSnackbar={handleCloseSnackbar}
        snackbarMsg={snackbarMsg}
        isSuccess={true}
      />
      <Container maxWidth="sm">
        <Grid container justifyContent="center" spacing={4}>
          <Grid item xs={12} textAlign="center">
            <Typography variant="h4">Login</Typography>
          </Grid>
            <Grid item container xs={12} direction="column" spacing={4}>
              <Grid item>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  autoComplete='off'
                  error={errMsg === "User not found"}
                  helperText={errMsg === "User not found" ? errMsg : null}
                />
              </Grid>
              <Grid item>
                <TextField
                  fullWidth
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  label="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  autoComplete='off'
                  error={errMsg === "Incorrect password"}
                  helperText={errMsg === "Incorrect password" ? errMsg : null}
                  InputProps={{
                    endAdornment: 
                    <InputAdornment position="start">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }}
                >
                  
                </TextField>
              </Grid>
              <Grid>
              </Grid>
              <Grid item>
                <Button item type="submit" variant="contained" color="primary" fullWidth>
                  Login
                </Button>
              </Grid>
            </Grid>
        </Grid>
      </Container>
    </form>
  );
};
