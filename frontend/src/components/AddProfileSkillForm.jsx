import React, { useState } from "react";
import {
  Box,
  Button,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Container,
  Typography,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { StaffProfileAPI } from "../apis/staffProfileAPI";
import { useNavigate } from "react-router-dom";
import UploadButton from "./UploadButton";

function AddProfileSkillForm({ allSkills, staffSkills, user }) {
  const navigate = useNavigate();
  const staffSkillIds = staffSkills.map((skill) => skill.skill_id);
  const skillsNotInStaff = allSkills.filter(
    (skill) => !staffSkillIds.includes(skill.skill_id)
  );

  const initialFormData = {
    skill_id: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submit clicked')
    const fileInput = e.target.querySelector('input[type="file"]');
    const file = fileInput ? fileInput.files[0] : null;
    if (file == null) {
      setSnackBarMsg("Please upload a certificate");
      setOpenSnackbar(true);
      return;
    }

    
    const formBody = new FormData();
    formBody.append("cert", file);

    StaffProfileAPI.addSkill(user.id, formData.skill_id, formBody)
      .then((response) => {
        setFormData(initialFormData);
        setSnackBarMsg("Skill successfully added!");
        setTimeout(() => {
          navigate("/profile");
        }, 1500);
      })
      .catch((err) => {
        setSnackBarMsg("Error adding skill")
        console.log(err);
      })
      .finally(() => {
        setOpenSnackbar(true);
      })
  };

  const [snackbarMsg, setSnackBarMsg] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [fileName, setFileName] = useState(null);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 2, p: 1 }}>
      <div style={{ position: "relative", height: "40px" }}>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          style={{
            position: "absolute",
            top: "35px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbarMsg === "Skill successfully added!" ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {snackbarMsg}
          </Alert>
        </Snackbar>
      </div>

      <Typography variant="h4" sx={{ textAlign: "center", my: 3 }}>
        Add a new skill to your profile
      </Typography>

      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <FormControl fullWidth sx={{ m: 1 }} required>
            <InputLabel id="skill_name">Skill Name</InputLabel>
            <Select
              name="skill_id"
              labelId="skill_id"
              id="skill_id"
              onChange={handleInputChange}
              label="skill_id"
            >
              {skillsNotInStaff.length > 0 ? (
                skillsNotInStaff.map((skill) => (
                  <MenuItem value={skill.skill_id}>{skill.skill_name}</MenuItem>
                ))
              ) : (
                <MenuItem value="">No skills to add</MenuItem>
              )}
            </Select>
          </FormControl>
          <Box sx={{display: "flex", marginTop: 1, marginBottom: 3, alignItems: "center", justifyContent:"space-between", width: "100%"}}>
            <Typography variant="h6">
              Upload a certification document
            </Typography>
            {fileName && <div>{fileName}</div>}
            <FormControl required>
              <UploadButton handleFileChange={handleFileChange}></UploadButton>
            </FormControl>
            
          </Box>
          
          <FormControl fullWidth sx={{ m: 2 }}>
            <Button
              type="submit"
              size="large"
              color="success"
              variant="contained"
              sx={{ padding: 1 }}
              disableElevation
            >
              Add Skill
            </Button>
          </FormControl>
        </Box>
      </form>
    </Container>
  );
}

export default AddProfileSkillForm;
