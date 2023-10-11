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
}
