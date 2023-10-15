export const StaffProfileAPI = {
  get: async function (id) {
    try {
      const response = await fetch(`http://localhost:8003/staff_profile/${id}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          },
      });

      if (!response.ok) {
          console.error("Error fetching staff profile:", response.status);
      } else {
          const responseData = await response.json();
          return responseData;
      }
    } catch (error) {
        console.error("Error fetching staff profile:", error);
    }
  },
} 