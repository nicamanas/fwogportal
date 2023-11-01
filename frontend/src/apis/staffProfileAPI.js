export const StaffProfileAPI = {
	get: async function (id) {
		try {
			const response = await fetch(
				`http://localhost:8003/staff_profile/${id}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			)

			if (!response.ok) {
				console.error("Error fetching staff profile:", response.status)
			} else {
				const responseData = await response.json()
				return responseData
			}
		} catch (error) {
			console.error("Error fetching staff profile:", error)
		}
	},
	getAll: async function () {
		const response = await fetch("http://localhost:8003/staff_profile", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})

		if (!response.ok) {
			console.error("Error fetching staff profiles:", response.status)
		} else {
			const responseData = await response.json()
			return responseData
		}
	},
	deleteSkill: async function (staff_id, skill_id) {
		try {
			const response = await fetch(
				`http://localhost:8003/staff_profile/${staff_id}/skill/${skill_id}`,
				{
					method: "DELETE",
					headers: {
						"Content-Type": "application/json",
					},
				}
			)

			if (!response.ok) {
				console.error("Error deleting skill profile:", response.status)
				throw new Error("Error deleting skill profile")
			} else {
				console.log("Successfully deleted skill profile")
				return true
			}
		} catch (error) {
			console.error("Error deleting skill profile:", error)
			throw new Error("Error deleting skill profile")
		}
	},
}
