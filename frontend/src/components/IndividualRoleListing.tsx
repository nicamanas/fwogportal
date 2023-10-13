import React from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid"
import Chip from "@mui/material/Chip"
import CardActions from "@mui/material/CardActions"
import Button from "@mui/material/Button"
import { UserStorage } from "../utils/userLocalStorageUtils"
import { RoleApplicationAPI } from "../apis/roleapplicationAPI"

type RoleListing = {
	role_listing_id: number
	role_name: string
	role_listing_desc: string
	role_description: string
	skills: string[]
	role_listing_close: string
	dept: string
}

type IndividualRoleListingProps = {
	roleListing: RoleListing
}

export default function IndividualRoleListing({
	roleListing,
}: IndividualRoleListingProps) {
	const {
		role_listing_id,
		role_name,
		role_listing_desc,
		role_description,
		skills,
		role_listing_close,
		dept,
	} = roleListing
	const formattedClosing = new Date(role_listing_close).toLocaleDateString(
		"en-SG",
		{ year: "numeric", month: "long", day: "numeric" }
	)

	const handleApply = (roleListing: RoleListing) => {
		console.log("Applying for role listing: ")
		console.log(roleListing)

		const user = UserStorage.getUser()
		console.log(user)

		console.log(roleListing.role_listing_id)
		console.log(user.id)
		RoleApplicationAPI.create(
			user.id,
			roleListing.role_listing_id,
			"ACTIVE"
		)
	}

	return (
		<Card
			variant="outlined"
			style={{ maxWidth: "1000px", margin: "20px auto" }}>
			<CardContent>
				<Grid
					container
					justifyContent="space-between"
					rowGap={4}>
					<Grid
						item
						xs={12}>
						<Typography variant="h2">{role_name}</Typography>
						<Divider />
					</Grid>
					<Typography>
						<strong>Listing Description:</strong>{" "}
						{role_listing_desc}
					</Typography>
					<Typography>
						<strong>About the role:</strong> {role_description}
					</Typography>
					<Typography>
						<strong>Department:</strong> {dept}
					</Typography>
					<Grid xs={12}>
						<Typography>
							<strong>Skills Required: </strong>
							{skills.map((skill) => {
								return (
									<Chip
										label={skill}
										variant="outlined"
									/>
								)
							})}
						</Typography>
					</Grid>
					<Typography>
						<strong>Closing Date:</strong> {formattedClosing}
					</Typography>
				</Grid>
			</CardContent>
			<CardActions sx={{ justifyContent: "center" }}>
				<Button
					size="large"
					color="primary"
					variant="contained"
					sx={{ width: "100%" }}
					onClick={() => handleApply(roleListing)}>
					Apply
				</Button>
			</CardActions>
		</Card>
	)
}
