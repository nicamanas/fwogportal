export const LJPSSkillsAPI = {
	getAll: async function () {
		try {
			const response = await fetch(
				"http://localhost:8003/ljps/skill_details",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			)

			if (!response.ok) {
				console.error("Error fetching skill listings:", response.status)
			} else {
				const responseData = await response.json()
				return responseData
			}
		} catch (error) {
			console.error("Error fetching skill listings:", error)
		}
	},

	// New function to fetch skills for a specific user
	getUserSkills: async function (staffId) {
		try {
			const response = await fetch(
				`http://localhost:8003/ljps/staff_skills/${staffId}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			)

			if (!response.ok) {
				console.error("Error fetching user skills:", response.status)
			} else {
				const responseData = await response.json()
				return responseData
			}
		} catch (error) {
			console.error("Error fetching user skills:", error)
		}
	},
	getAllStaffSkills: async function () {
		try {
			const response = await fetch(
				"http://localhost:8003/ljps/staff_skills/",
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			)

			if (!response.ok) {
				console.error("Error fetching staff skills:", response.status)
			} else {
				const responseData = await response.json()
				return responseData
			}
		} catch (error) {
			console.error("Error fetching staff skills:", error)
		}
	},
}
