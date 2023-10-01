export const RoleListingAPI = {
  getAll: async function () {
    try {
      const response = await fetch("http://localhost:8003/rolelistings/", {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          },
      });

      if (!response.ok) {
          console.error("Error posting data with status:", response.status, responseData);
      } else {
          const responseData = await response.json();
          return responseData;
      }
    } catch (error) {
        console.error("Error posting data:", error);
    }
  }
} 