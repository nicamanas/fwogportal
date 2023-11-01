import * as React from "react"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Chip from "@mui/material/Chip"
import Typography from "@mui/material/Typography"
import { CardActionArea } from "@mui/material"
import Grid from "@mui/material/Grid"
import { useNavigate } from "../router"

type Skill = {
	skill_id: number
	skill_name: string
}

type Candidate = {
	staff_id: number
	fname: string
	lname: string
	dept: string
	email: string
	phone: string
	biz_address: string
	skills: Skill[]
}

export default function CandidateCard({
	candidate,
	selectedSkills,
	skillListings,
	staffSkills,
}: any) {
	const navigate = useNavigate()
	// const handleClick = () =>
	// 	navigate("/rolelistings/:id", {
	// 		params: { id: role_listing_id.toString() },
	// 	})

	// const hasRelevantSkills = checkSkills(skills, userSkills)

	return (
		<Card sx={{ height: "300px" }}>
			<CardActionArea sx={{ height: "100%", p: 2 }}>
				{/* onClick={handleClick} */}
				<Grid
					container
					justifyContent="space-between"
					sx={{ height: "100%" }}>
					<Grid item>
						<Typography
							gutterBottom
							variant="h5"
							component="div">
							{candidate.fname + " " + candidate.lname}
						</Typography>
						<Typography
							variant="body2"
							color="text.secondary">
							Department: {candidate.dept}
						</Typography>
						<Typography
							variant="body2"
							color="text.secondary">
							Email: {candidate.email}
						</Typography>
						<Typography
							variant="body2"
							color="text.secondary">
							Phone: {candidate.phone}
						</Typography>
						<Typography
							variant="body2"
							color="text.secondary">
							Business Address: {candidate.biz_address}
						</Typography>
					</Grid>

					{candidate.skills ? (
						<Grid
							item
							container
							alignItems="flex-end">
							<Grid
								item
								xs={12}>
								{candidate.skills.map((skill: any) => {
									skill = skillListings.find(
										(skillListing: any) =>
											skillListing.skill_id ===
											skill.skill_id
									)
									let isSkillMatched = false
									if (selectedSkills.includes(skill)) {
										isSkillMatched = true
									}
									if (isSkillMatched) {
										return (
											<Chip
												label={skill.skill_name}
												color="secondary"
												sx={{
													marginRight: 1,
													marginBottom: 1,
												}}
											/>
										)
									} else {
										return (
											<Chip
												label={skill.skill_name}
												variant="outlined"
												color="default"
												sx={{
													borderColor: "grey",
													color: "grey",
													marginRight: 1,
													marginBottom: 1,
												}}
											/>
										)
									}
								})}
							</Grid>
						</Grid>
					) : (
						<Typography>No Skills Data</Typography>
					)}
				</Grid>
			</CardActionArea>
		</Card>
	)
}

function checkSkills(requiredSkills: string[], userSkills?: string[]) {
	if (!Array.isArray(userSkills)) return false
	return requiredSkills.every((skill) => userSkills.includes(skill))
}
