import { RoleListingAPI } from '../apis/rolelistingAPI'
import RoleListingCard from '../components/RoleListingCard'
import { useEffect, useState } from 'react'

export default function Home() {
  const [roleListings, setRoleListings] = useState([])

  useEffect(() => {
    RoleListingAPI.getAll().then((rolelistings) => {
      setRoleListings(rolelistings);
    })
  }, [])
  return (
    <div>
      <h1>Home</h1>
      {
        roleListings.length > 0 &&
        roleListings.map((roleListing) => {
          return <RoleListingCard key={roleListing.role_listing_id} roleListing={roleListing} />
        })
      }
    </div>  
  )
}
