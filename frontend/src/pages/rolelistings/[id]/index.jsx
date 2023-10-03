import { useMatch, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { RoleListingAPI } from '../../../apis/rolelistingAPI'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography  from '@mui/material/Typography'
import IndividualRoleListing from '../../../components/IndividualRoleListing'

export default function RoleListing() {
  const { id } = useParams('/rolelistings/:id')
  const [roleListing, setRoleListing] = useState(null)
  useEffect(() => {
    RoleListingAPI.get(id).then((rolelisting) => {
      setRoleListing(rolelisting)
    })
  }, [])


  return (<Box>
    { roleListing === null 
      ? <Skeleton variant="rectangular" width={210} height={118} /> 
      : <IndividualRoleListing roleListing={roleListing} />
    }
  </Box>)
}