import { RoleListingAPI } from "../apis/rolelistingAPI";
import RoleListingCard from "./RoleListingCard";
import { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Container,
  Grid,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { LJPSSkillsAPI } from "../apis/ljpsSkillsAPI";
import FilterRoles from "./FilterRoles";
import { UserStorage } from "../utils/userLocalStorageUtils";

export default function HomePage() {
  const [skillListings, setSkillListings] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  // front-end based filtering for now
  const [roleListings, setRoleListings] = useState([]);
  const [filteredRoleListings, setFilteredRoleListings] = useState([]);

  // role-skill match
  const [userSkills, setUserSkills] = useState([]);
  const userId = UserStorage.getUser().id;

  useEffect(() => {
    RoleListingAPI.getAllOpen().then((rolelistings) => {
      setRoleListings(rolelistings);
      setFilteredRoleListings(rolelistings);
    });
    LJPSSkillsAPI.getAll().then((skillListings) => {
      setSkillListings(skillListings);
    });
    LJPSSkillsAPI.getUserSkills(userId).then(skills => {
      const skillNames = skills.map(skill => skill.skill_name);
      setUserSkills(skillNames);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let filteredRoles;
    if (selectedSkills.length === 0) {
      setFilteredRoleListings(roleListings);
      return;
    }
    filteredRoles = roleListings.filter((roleListing) => {
      return selectedSkills.every((skill) => {
        return roleListing.skills.includes(skill);
      });
    })
    setFilteredRoleListings(filteredRoles);
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
     <Box sx={{ maxWidth: '1200px', width: '100%' }}>
      <FilterRoles
        skillListings={skillListings}
        roleListings={roleListings}
        setSelectedSkills={setSelectedSkills}
        setFilteredRoleListings={setFilteredRoleListings}
        handleSubmit={handleSubmit}
        sx={{ mb:2 }}
      />
      </Box>  
      <Box sx={{ maxWidth: '1800px', width: '100%' }}>
        <Grid container spacing={6} justifyContent="center">
          {filteredRoleListings.length > 0 &&
            filteredRoleListings.map((roleListing, index) => (
              <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={index}>
                <RoleListingCard roleListing={roleListing} userSkills={userSkills}/>
              </Grid>
            ))}
        </Grid>
      </Box>
    </Box>
  );
}
