import React from "react";
import {
  Autocomplete,
  Button,
  Box,
  Container,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function FilterRoles({
  skillListings,
  roleListings,
  setSelectedSkills,
  setFilteredRoleListings,
  handleSubmit,
  sx,
}) {
  return (
    <Box sx={sx}>
      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={2} alignItems="center">
          <img
            src="src/assets/pepe.png"
            alt="Pepe"
            width="50px"
            height="50px"
          />
          <Typography variant="h6">Search Role Listings by Skills</Typography>

          <Autocomplete
            multiple
            id="skill-search-bar"
            freeSolo
            options={skillListings.map(
              (skill_option) => skill_option.skill_name
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip
                  variant="outlined"
                  label={option}
                  {...getTagProps({ index })}
                />
              ))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Skills"
                placeholder="Select Skills"
              />
            )}
            onChange={(event, value) => {
              setSelectedSkills(value);
              setFilteredRoleListings(roleListings);
            }}
          />
          <FormControl>
            <Button
              type="submit"
              size="large"
              variant="contained"
              sx={{ backgroundColor: "#7d86d9", paddingY: "14px" }}
              disableElevation
            >
              Search
            </Button>
          </FormControl>
        </Stack>
      </form>
    </Box>
  );
}
