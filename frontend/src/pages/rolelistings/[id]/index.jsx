import { useMatch, useParams } from 'react-router-dom'

export default function RoleListing() {
  const { id } = useParams('/rolelistings/:id')
  const match = useMatch('/rolelistings/:id')

  return <h1> Role Listing Id from URL: {id}</h1>
}