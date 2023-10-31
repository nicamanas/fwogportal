import {useState, useEffect} from "react"
import { SBRPSkillsAPI } from "../../../apis/sbrpSkillsAPI"
import AddProfileSkillForm from "../../../components/AddProfileSkillForm"
import { Typography } from "@mui/material";

export default function AddSkill(props) {
  const [allSkills, setAllSkills] = useState(null);
  useEffect(() => {
    SBRPSkillsAPI.getAll().then((skills) => {
      setAllSkills(skills);
    });
  }, [])
  if (allSkills === null) {
    return <Typography variant="h5">Loading...</Typography>
  }
  return (
    <AddProfileSkillForm allSkills={allSkills}/>
  )
};

