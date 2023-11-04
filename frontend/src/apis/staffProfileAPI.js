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

      if (!response.ok) {
        console.error("Error deleting skill profile:", response.status);
        throw new Error("Error deleting skill profile");
      } else {
        console.log("Successfully deleted skill profile");
        return true;
      }
    } catch (error) {
      console.error("Error deleting skill profile:", error);
      throw new Error("Error deleting skill profile");
    }
  },
  addSkill: async function (staff_id, skill_id, data) {
    var options;
    if (data == null) {
      options = {
        method: "POST",
      };
    } else {
      options = {
        method: "POST",
        body: data
      }
    }

    try {
      const response = await fetch(
        `http://localhost:8003/staff_profile/${staff_id}/skill/${skill_id}`,
        options
      );

      if (!response.ok) {
        console.error("Error adding skill to profile:", response.status);
        throw new Error("Error adding skill to profile");
      } else {
        console.log("Successfully added skill to profile");
        return true;
      }
    } catch (error) {
      console.error("Error adding skill to profile:", error);
      throw new Error("Error adding skill to profile");
    }
  },
  updateSkill: async function (staff_id, skill_id, data) {
    var options;
    if (data == null) {
      options = {
        method: "PUT",
      };
    } else {
      options = {
        method: "PUT",
        body: data
      }
    }

    try {
      const response = await fetch(
        `http://localhost:8003/staff_profile/${staff_id}/skill/${skill_id}/status/unverified`,
        options
      );

      if (!response.ok) {
        console.error("Error updating skill on profile:", response.status);
        throw new Error("Error updating skill on profile");
      } else {
        console.log("Successfully updated skill on profile");
        return true;
      }

    } catch (error) {
      console.error("Error updating skill on profile:", error);
      throw new Error("Error updating skill on profile");
    }
  },
  getCertificate: async function (staff_id, skill_id) {
    try {
      const response = await fetch(
        `http://localhost:8003/staff_profile/${staff_id}/cert/${skill_id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        console.error("Error fetching certificate:", response.status);
        throw new Error("Error fetching certificate");
      } else {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'certificate.pdf'; // Set the desired filename
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        console.log("Successfully fetched certificate");
        return true;
      }
    } catch (error) {
      console.error("Error fetching certificate:", error);
      throw new Error("Error fetching certificate");
    }
  }
};
