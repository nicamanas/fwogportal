import { useMatch, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { RoleListingAPI } from '../../../apis/rolelistingAPI'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography  from '@mui/material/Typography'
import IndividualRoleListing from '../../../components/IndividualRoleListing'
import { UserStorage } from "../../../utils/userLocalStorageUtils";
import { LJPSSkillsAPI } from "../../../apis/ljpsSkillsAPI";

export default function RoleListing() {
  const { id } = useParams('/rolelistings/:id')
  const [roleListing, setRoleListing] = useState(null)
  const [userSkills, setUserSkills] = useState([]);
  const userId = UserStorage.getUser().id;

  useEffect(() => {
    RoleListingAPI.get(id).then((rolelisting) => {
      console.log("Fetched role listing:", rolelisting); 
      setRoleListing(rolelisting)
    });
    LJPSSkillsAPI.getUserSkills(userId).then(skills => {
      console.log("Fetched user skills:", skills); 
      const skillNames = skills.map(skill => skill.skill_name);
      setUserSkills(skillNames);
    });
  }, [])

  return (<Box>
    { roleListing === null 
      ? <Skeleton variant="rectangular" width={210} height={118} /> 
      : <IndividualRoleListing roleListing={roleListing} userSkills={userSkills}/>
    }
  </Box>)
}