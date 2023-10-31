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
				console.log(responseData)
				throw new Error(responseData.detail)
			}

			return responseData
		} catch (e) {
			throw new Error(e)
		}
	},
	getall: async function () {
		try {
			const response = await fetch(
				`http://localhost:8003/roleapplications/`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			const responseData = await response.json()

			if (!response.ok) {
				throw new Error(
					"Error getting data with status: ",
					response.status,
					responseData
				)
			} else {
				return responseData
			}
		} catch (error) {
			throw new Error("Error getting data: ", error)
		}
	},
	withdraw: async function (appId) {
		try {
			const response = await fetch(
				`http://localhost:8003/roleapplications/${appId}`,
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			const responseData = await response.json()

			if (!response.ok) {
				throw new Error(
					"Error getting data with status: ",
					response.status,
					responseData
				)
			} else {
				return responseData
			}
		} catch (error) {
			throw new Error("Error getting data: ", error)
		}
	},
  getByRoleListingId: async function (roleListingId) {
		try {
			const response = await fetch(
				`http://localhost:8003/roleapplications/listing/${roleListingId}`,
				{
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				}
			)
			const responseData = await response.json()

			if (!response.ok) {
				throw new Error(
					"Error getting data with status: ",
					response.status,
					responseData
				)
			} else {
				return responseData
			}
		} catch (error) {
			throw new Error("Error getting data: ", error)
		}
	},
}
