import { RoleListingAPI } from '../apis/rolelistingAPI'
import RoleListingCard from '../components/RoleListingCard'
import { useEffect, useState } from 'react'
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"


export default function Home() {
  const [roleListings, setRoleListings] = useState([])

  useEffect(() => {
    RoleListingAPI.getAll().then((rolelistings) => {
      setRoleListings(rolelistings);
    })
  }, [])
  return (
    <Box sx={{ flexGrow: 1}}>
      <Grid container columnSpacing={6} rowSpacing={6}>
        {roleListings.length > 0 && 
        roleListings.map((roleListing, index) => (
          <Grid item xs={12} sm={12} md={6} lg={4} xl={3} key={index}>
            <RoleListingCard roleListing={roleListing} />
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
