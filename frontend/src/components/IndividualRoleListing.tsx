import React, { useState } from "react"
import {
	Button,
	Card,
	CardActions,
	CardContent,
	Chip,
	Divider,
	Grid,
	Snackbar,
	Typography,
} from "@mui/material"
import MuiAlert from "@mui/material/Alert"
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
	const [snackbarMsg, setSnackBarMsg] = useState("")
	const [snackbarStatus, setSnackBarStatus] = useState("success")
	const [openSnackbar, setOpenSnackbar] = useState(false)

	const Alert = React.forwardRef(function Alert(props: any, ref: any) {
		return (
			<MuiAlert
				elevation={6}
				ref={ref}
				variant="filled"
				{...props}
			/>
		)
	})

	const handleCloseSnackbar = (event: any, reason: any) => {
		if (reason === "clickaway") {
			return
		}
		setOpenSnackbar(false)
	}

	const handleApply = (roleListing: RoleListing) => {
		console.log("Applying for role listing: ")
		console.log(roleListing)

		const user = UserStorage.getUser()

		RoleApplicationAPI.create(
			user.id,
			roleListing.role_listing_id,
			"ACTIVE"
		)
			.then((response: any) => {
				console.log(response)
				setSnackBarStatus("success")
				setSnackBarMsg("Successfully applied for role listing!")
			})
			.catch((error: any) => {
				console.error(error)
				setSnackBarStatus("error")
				if (
					error.message ==
					"Error: You have already applied for this role listing."
				) {
					setSnackBarMsg(
						"You have already applied for this role listing!"
					)
				} else {
					setSnackBarMsg("Failed to apply for role listing!")
				}
			})
			.finally(() => setOpenSnackbar(true))
	}

	return (
		<Card
			variant="outlined"
			style={{ maxWidth: "1000px", margin: "20px auto" }}>
			<div style={{ position: "relative", height: "40px" }}>
				<Snackbar
					open={openSnackbar}
					autoHideDuration={6000}
					style={{
						position: "absolute",
						top: "35px",
						left: "50%",
						transform: "translateX(-50%)",
					}}
					onClose={handleCloseSnackbar}>
					<Alert
						onClose={handleCloseSnackbar}
						severity={snackbarStatus}
						sx={{ width: "100%" }}>
						{snackbarMsg}
					</Alert>
				</Snackbar>
			</div>
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
