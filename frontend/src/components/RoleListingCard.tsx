import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Grid from '@mui/material/Grid';

type RoleListing = {
  role_name: string
  role_listing_desc: string
  skills: string[]
  role_listing_close: string
}

type RoleListingCardProps = {
  roleListing: RoleListing
}

export default function RoleListingCard({ roleListing } : RoleListingCardProps) {
  const { role_name, role_listing_desc, skills, role_listing_close } = roleListing;
  const formattedClosing = new Date(role_listing_close).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  

  return (
    <Card sx={{height: '300px'}}>
      <CardActionArea sx={{height: "100%", p: 2}}>
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
                  return <Chip label={skill} variant='outlined'/>
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
