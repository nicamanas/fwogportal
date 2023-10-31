import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Chip,
  Paper,
  Typography,
  Stack,
  Grid,
  Divider
} from "@mui/material";
import { StaffProfileAPI } from "../../../apis/staffProfileAPI"
import { SBRPSkillsAPI } from "../../../apis/sbrpSkillsAPI";
import { useNavigate } from "../../../router"

export default function StaffProfile() {
  const { id } = useParams("/staff/:id");
  const [profile, setProfile] = useState(null);
  const [skillsMapping, setSkillsMapping] = useState(null);
  const [allSkills, setAllSkills] = useState(null);

  const formatName = (firstName, lastName) => {
    firstName = firstName
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
    lastName = lastName.charAt(0) + lastName.slice(1).toLowerCase();
    return firstName + " " + lastName;
  };

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
    StaffProfileAPI.get(id).then((profile) => {
      setProfile(profile);
      console.log(profile)
    });
  }, []);
  if (!allSkills | !skillsMapping) {
    return <Typography variant="h3">Loading...</Typography>;
  }

  if (!profile) {
    return <Typography variant="h3">No such user</Typography>;
  }

  return (
    <>
    <Paper sx={{ padding: 4,  maxWidth: "1000px", margin: "auto"}}>
      <Stack spacing={2}>
        <Typography variant="h6">Staff Profile</Typography>
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
          </Grid>
        </Stack>
        {profile.skills.map((skill, index) => (
          <Grid direction="row" container alignItems="center">
            <Typography display="inline" sx={{ flexGrow: 1 }}>
              {skillsMapping[skill.skill_id]}
            </Typography>
            <Chip label={skill.ss_status} key={index} />
          </Grid>
        ))}
      </Stack>
    </Paper>
    
    </>
  );
}
