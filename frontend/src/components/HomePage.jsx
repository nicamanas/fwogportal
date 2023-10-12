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

export default function HomePage() {
  const [skillListings, setSkillListings] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  // front-end based filtering for now
  const [roleListings, setRoleListings] = useState([]);
  const [filteredRoleListings, setFilteredRoleListings] = useState([]);

  useEffect(() => {
    RoleListingAPI.getAllOpen().then((rolelistings) => {
      setRoleListings(rolelistings);
      setFilteredRoleListings(rolelistings);
    });
    LJPSSkillsAPI.getAll().then((skillListings) => {
      setSkillListings(skillListings);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let filteredRoles;
    if (selectedSkills.length === 0) {
      setFilteredRoleListings(roleListings);
      return;
    }
    for (const skill of selectedSkills) {
      filteredRoles = roleListings.filter((roleListing) => {
        return roleListing.skills.includes(skill);
      });
    }
    setFilteredRoleListings(filteredRoles);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <FilterRoles
        skillListings={skillListings}
        roleListings={roleListings}
        setSelectedSkills={setSelectedSkills}
        setFilteredRoleListings={setFilteredRoleListings}
        handleSubmit={handleSubmit}
        sx={{ mb:2 }}
      />
      <Grid container columnSpacing={6} rowSpacing={6}>
        {filteredRoleListings.length > 0 &&
          filteredRoleListings.map((roleListing, index) => (
            <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={index}>
              <RoleListingCard roleListing={roleListing} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
