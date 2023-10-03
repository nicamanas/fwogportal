import React from 'react';
import { useEffect, useState } from 'react';
import { Autocomplete, Button, Chip, Container, FormControl, Paper, Stack, TextField, Typography } from '@mui/material';
import { SkillListingAPI } from '../../apis/skilllistingAPI';

export default function ViewFilterRoleListing() {

    const [skillListings, setSkillListings] = useState([])
    const [selectedSkills, setSelectedSkills] = useState([])

    useEffect(() => {
        SkillListingAPI.getAll().then((skillListings) => {
            setSkillListings(skillListings);
        })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log(selectedSkills)
    }

    return (
        <Paper sx={{ flexGrow: 1 }}>
            <Container maxWidth="md" sx={{backgroundColor: 'white', mt: 7, p:1}}>
                <Typography variant="h3" sx={{ textAlign: 'center', my:3}}>
                    <img src="src/assets/pepe.png" alt="Pepe" width="50px" height="50px"/>
                    Search Role Listings by Skills
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} sx={{m: 2}}>
                        <Autocomplete 
                        multiple
                        id="skill-search-bar" 
                        freeSolo 
                        options={skillListings.map((skill_option) => skill_option.skill_name)} 
                        renderTags={(value, getTagProps) => value.map((option, index) => 
                        (<Chip variant="outlined" label={option} {...getTagProps({index})} />))}
                        renderInput={(params) => (
                            <TextField
                            {...params}
                            label="Select Skills"
                            placeholder="Select Skills"
                            />)}
                        onChange={(event, value) => setSelectedSkills(value)}
                        />
                        <FormControl fullWidth sx={{m:2}}>
                            <Button type="submit" size="large" variant="contained" sx={{backgroundColor:"#7d86d9", padding:1}} disableElevation>
                                    Search
                            </Button>
                        </FormControl> 
                    </Stack>              
                </form>
            </Container>
        </Paper>
    );
}
