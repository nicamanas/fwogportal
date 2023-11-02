import { useEffect, useState } from "react";
import {
  Chip,
  Paper,
  Typography,
  Stack,
  Grid,
  IconButton,
  Button,
  Divider
} from "@mui/material";
import { StaffProfileAPI } from "../../apis/staffProfileAPI";
import { UserStorage } from "../../utils/userLocalStorageUtils";
import { SBRPSkillsAPI } from "../../apis/sbrpSkillsAPI";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteConfirmation from "./_components/DeleteConfirmation";
import { useNavigate } from "../../router"
import CustomSnackbar from "../../components/CustomSnackbar";

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [allSkills, setAllSkills] = useState([]);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [skillToDelete, setSkillToDelete] = useState(null);
  const [skillsMapping, setSkillsMapping] = useState({});
  const [snackbarMsg, setSnackBarMsg] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const formatName = (firstName, lastName) => {
    firstName = firstName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
    lastName = lastName.charAt(0) + lastName.slice(1).toLowerCase();
    return firstName + " " + lastName;
  };
  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }
    setOpenSnackbar(false);
  };

  const handleDeleteClose = () => {
    setSkillToDelete(null);
    setOpenDeleteConfirmation(false);
  }

  const handleDelete = () => {
    StaffProfileAPI.deleteSkill(profile.staff_id, skillToDelete).then(() => {
      setTimeout(() => {
        navigate(0);
      }, 1500)
      setSnackBarMsg("Skill deleted from profile successfully!");
    })
    .catch((err) => {
      setSnackBarMsg("Error deleting skill from profile")
    }).finally(() => {
      setOpenSnackbar(true);
      setOpenDeleteConfirmation(false);
    })
  }

  useEffect(() => {
    SBRPSkillsAPI.getAll().then((skills) => {
      setAllSkills(skills);
      skills.forEach((skill) => {
        setSkillsMapping((prevState) => ({
          ...prevState,
          [skill.skill_id]: skill.skill_name,
        }));
      });
    });
    const user = UserStorage.getUser();
    if (user != null) {
      StaffProfileAPI.get(user.id).then((profile) => {
        setProfile(profile);
        console.log(profile)
      });
    } else {
      navigate("/")
    }
  }, []);

  if (!profile) {
    return <Typography variant="h3">Not logged in</Typography>;
  }

  return (
    <>
    <CustomSnackbar
      openSnackbar={openSnackbar}
      handleCloseSnackbar={handleCloseSnackbar}
      snackbarMsg={snackbarMsg}
      isSuccess={snackbarMsg=="Skill deleted from profile successfully!" ? true : false}
    />
    <Paper sx={{ padding: 4, maxWidth: "1000px", margin: "auto" }} >
      <DeleteConfirmation
        openDeleteConfirmation={openDeleteConfirmation}
        handleDeleteClose={handleDeleteClose}
        handleDelete={handleDelete}
        skillname={setSkillToDelete != null ? skillsMapping[skillToDelete] : ""}
      />
      <Stack spacing={2}>
        <Typography variant="h6">My Profile</Typography>
        <Typography>
          <strong>Name:</strong> {formatName(profile.fname, profile.lname)}
        </Typography>
        <Typography>
          <strong>Department:</strong>{" "}
          {profile.dept.charAt(0).toUpperCase() +
            profile.dept.slice(1).toLowerCase()}
        </Typography>
        <Typography>
          <strong>Email:</strong> {profile.email}
        </Typography>
        <Typography>
          <strong>Phone:</strong> {profile.phone}
        </Typography>
        <Typography>
          <strong>Business Address:</strong> {profile.biz_address}
        </Typography>
        <Divider/>
        <Stack>
          <Grid direction="row" container alignItems="center">
            <Typography display="span" flexGrow={1}>
              <strong>Skills: </strong>
            </Typography>
              <Button
                variant="contained"
                sx={{ padding: 1 }}
                disableElevation
                startIcon={<AddIcon />}
                onClick={() => {navigate("/profile/addskill")}}
              >
                Add Skill
              </Button>
          </Grid>
        </Stack>
        {profile.skills.map((skill, index) => (
          <Grid direction="row" container alignItems="center">
            <Typography display="inline" sx={{ flexGrow: 1 }}>
              {skillsMapping[skill.skill_id]}
            </Typography>
            {
              
            }
            <Button
                variant="outlined"
                sx={{padding:1, marginRight: 1}}
                startIcon={<AddIcon />}
                onClick={() => {navigate("/profile/addskill")}}
              >
                Upload Certificate
            </Button>
            <Chip label={skill.ss_status} key={index} />
            
            <IconButton color="error" onClick={() => {
              setOpenDeleteConfirmation(true)
              setSkillToDelete(skill.skill_id)
              }}>
              <DeleteIcon />
            </IconButton>

          </Grid>
        ))}
      </Stack>
    </Paper>
    
    </>
  );
}
