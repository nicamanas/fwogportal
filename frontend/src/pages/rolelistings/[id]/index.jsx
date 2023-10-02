import { useMatch, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { RoleListingAPI } from '../../../apis/rolelistingAPI'

export default function RoleListing() {
  const { id } = useParams('/rolelistings/:id')
  useEffect(() => {
    RoleListingAPI.get(id).then((rolelisting) => {
      console.log(rolelisting)
    })
  }, [])


  return <h1> Role Listing Id from URL: {id}</h1>
}