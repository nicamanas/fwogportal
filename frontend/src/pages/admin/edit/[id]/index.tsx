import { useMatch, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { RoleListingAPI } from '../../../../apis/rolelistingAPI'
import Skeleton from '@mui/material/Skeleton'
import Box from '@mui/material/Box'
import EditRoleListingForm from '../../../../components/EditRoleListingForm'

export default function EditRoleListing() {
  const { id } = useParams();
  const [roleListing, setRoleListing] = useState<RoleListing | null>(null)
  useEffect(() => {
    RoleListingAPI.get(id).then((rolelisting: RoleListing) => {
      setRoleListing(rolelisting)
    })
  }, [])


  return (<Box>
    { roleListing === null 
      ? <Skeleton variant="rectangular" width={210} height={118} /> 
      : <EditRoleListingForm roleListing={roleListing} />
    }
  </Box>)
}