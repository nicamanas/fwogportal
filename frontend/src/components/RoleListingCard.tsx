import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

type RoleListing = {
  role_name: String
  role_listing_desc: String
  skills: String[]
  role_listing_close: String
}

type RoleListingCardProps = {
  roleListing: RoleListing
}

export default function RoleListingCard({ roleListing } : RoleListingCardProps) {
  const { role_name, role_listing_desc, skills, role_listing_close } = roleListing;
  console.log(roleListing)

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {role_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {role_listing_desc}
          </Typography>
          {
            skills.map((skill) => {
              return <Chip label={skill} variant='outlined'/>
            })
          }
          <Typography variant="body2" color="text.secondary">
            {role_listing_close}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
