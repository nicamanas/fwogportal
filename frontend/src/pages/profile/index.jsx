import { useEffect, useState } from "react";
import { Chip, Paper, Typography, Stack } from "@mui/material";
import { StaffProfileAPI } from "../../apis/staffProfileAPI";
import { UserStorage } from "../../utils/userLocalStorageUtils";
import { SBRPSkillsAPI } from "../../apis/sbrpSkillsAPI";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [allSkills, setAllSkills] = useState([]);
  const [skillsMapping, setSkillsMapping] = useState({});
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
    const user = UserStorage.getUser();
    if (user != null) {
      StaffProfileAPI.get(user.id).then((profile) => {
        setProfile(profile);
      });
    }
  }, []);

  if (!profile) {
    return <Typography variant="h3">Not logged in</Typography>;
  }

  return (
    <Paper sx={{ padding: 4 }}>
      <Stack spacing={2}>
        <Typography variant="h6">Profile</Typography>
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
        <Stack>
          <Typography>
            <strong>Skills: </strong>
          </Typography>
        </Stack>
          {profile.skills.map((skill, index) => (
            <Chip label={skillsMapping[skill.skill_id]} key={index}></Chip>
          ))}
      </Stack>
    </Paper>
  );
}
