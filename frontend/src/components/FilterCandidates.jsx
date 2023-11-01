import React from "react";
import {
  Autocomplete,
  Button,
  Box,
  Chip,
  Grid,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

export default function FilterCandidates({
  skillListings,
  setSelectedSkills,
  handleSubmit,
  staff,
  setFilteredStaff
}) {
  return (
    <Box sx={{mx:3, mb: 4}}>
      <Typography variant="h5" marginBottom={3}>
        Search Candidates by Skills
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Grid container direction="row" item>
            <Grid item xs={9}>
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
                      size="small"
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
                    fullWidth
                  />
                )}
                onChange={(event, value) => {
                    let skillDetails = []
                    value.forEach((skill) => {
                        const skillDetail = skillListings.find((skillListing) => {
                            return skillListing.skill_name == skill
                        })
                        skillDetails.push(skillDetail)
                    })
                    setSelectedSkills(skillDetails);
                    setFilteredStaff(staff);
                }}
              />
            </Grid>
            <Grid item xs={3} textAlign="end">
              <FormControl sx={{width: "96%"}}>
              <Button
                  type="submit"
                  size="medium"
                  variant="contained"
                  color="secondary"
                  sx={{ paddingY: "14px", width: "100%"}}
                  disableElevation
                >
                  Search
                </Button>
              </FormControl>
            </Grid>
          </Grid>
        </Stack>
      </form>
    </Box>
  );
}