export const RoleApplicationAPI = {
	create: async function (staff_id, role_listing_id, role_app_status) {
		try {
			const response = await fetch(
				`http://localhost:8003/roleapplications/`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						staff_id: staff_id,
						role_listing_id: role_listing_id,
						role_app_status: role_app_status,
					}),
				}
			)

			const responseData = await response.json()

			if (!response.ok) {
				throw new Error(
					"Error posting data with status: ",
					response.status,
					responseData
				)
			} else {
				return responseData
			}
		} catch (error) {
			throw new Error("Error posting data: ", error)
		}
	},
}
