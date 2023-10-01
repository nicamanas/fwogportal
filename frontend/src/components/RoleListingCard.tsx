import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

type RoleListingCardProps = {
  title: String
  description: String
  skills: String[]
  deadline: String
}



export default function RoleListingCard({ title, description, skills, deadline } : RoleListingCardProps) {
  


  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          {
            skills.map((skill) => {
              return <Chip label={skill} variant='outlined'/>
            })
          }
          <Typography variant="body2" color="text.secondary">
            {deadline}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
