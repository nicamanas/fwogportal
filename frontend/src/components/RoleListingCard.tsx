import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useNavigate } from "../router";

type RoleListing = {
  role_listing_id: number
  role_name: string
  role_listing_desc: string
  skills: string[]
  role_listing_close: string
}

type RoleListingCardProps = {
  roleListing: RoleListing;
  userSkills: string[];
}

export default function RoleListingCard({ roleListing , userSkills} : RoleListingCardProps) {
  const { role_listing_id, role_name, role_listing_desc, skills, role_listing_close } = roleListing;
  const formattedClosing = new Date(role_listing_close).toLocaleDateString('en-SG', { day: 'numeric', month: 'long', year: 'numeric' })
  const navigate = useNavigate();
  const handleClick = () => navigate("/rolelistings/:id", { params: { id: role_listing_id.toString() } });

  const hasRelevantSkills = checkSkills(skills, userSkills);

  return (
    <Card sx={{height: '300px'}}>
      <CardActionArea sx={{height: "100%", p: 2}} onClick={handleClick}>
        <Grid container justifyItems="space-between" sx={{height: "100%"}}>
          <Grid item>
            <Typography gutterBottom variant="h5" component="div">
            {role_name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {role_listing_desc}
            </Typography>
          </Grid>
          <Grid item container alignItems="flex-end">
            <Grid item xs={12}>
              {
                skills.map((skill) => {
                  const isSkillMatched = userSkills.includes(skill);
                  return <Chip label={skill} 
                        variant='outlined'
                        color={isSkillMatched ? "primary" : "default"}
                        sx={{
                          borderColor: isSkillMatched ? "green" : "grey",
                          color: isSkillMatched ? "green" : "grey",
                          marginRight: 1,
                          marginBottom: 1
                        }}/>
                })
              }
            </Grid>
            
            <Typography variant="body2" color="text.secondary">
              Closing date: {formattedClosing}
            </Typography>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
}

function checkSkills(requiredSkills, userSkills) {
  return requiredSkills.every(skill => userSkills.includes(skill));
}