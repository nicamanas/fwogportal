import { useState, useEffect } from "react";
import { SBRPSkillsAPI } from "../../../apis/sbrpSkillsAPI";
import AddProfileSkillForm from "../../../components/AddProfileSkillForm";
import { Typography } from "@mui/material";
import { UserStorage } from "../../../utils/userLocalStorageUtils";
import { StaffProfileAPI } from "../../../apis/staffProfileAPI";

export default function AddSkill(props) {
  const [allSkills, setAllSkills] = useState(null);
  const [staffSkills, setStaffSkills] = useState(null);
  const user = UserStorage.getUser();

  useEffect(() => {
    SBRPSkillsAPI.getAll().then((skills) => {
      setAllSkills(skills);
    });
    if (user != null) {
      StaffProfileAPI.get(user.id).then((profile) => {
        setStaffSkills(profile.skills);
      });
    }
  }, []);

  return allSkills === null || staffSkills === null ? (
    <Typography variant="h5">Loading...</Typography>
  ) : (
    <AddProfileSkillForm allSkills={allSkills} staffSkills={staffSkills} user={user}/>
  );
}
