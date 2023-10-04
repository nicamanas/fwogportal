export const RoleListingAPI = {
  get: async function (id) {
    try {
      const response = await fetch(`http://localhost:8003/rolelistings/${id}`, {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          },
      });

      if (!response.ok) {
          console.error("Error fetching role listing:", response.status);
      } else {
          const responseData = await response.json();
          return responseData;
      }
    } catch (error) {
        console.error("Error fetching role listing:", error);
    }
  },
  getAll: async function () {
    try {
      const response = await fetch("http://localhost:8003/rolelistings/", {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          },
      });

      if (!response.ok) {
          console.error("Error fetching role listings:", response.status);
      } else {
          const responseData = await response.json();
          return responseData;
      }
    } catch (error) {
        console.error("Error fetching role listings:", error);
    }
  },
  getAllOpen: async function () {
    try {
      const response = await fetch("http://localhost:8003/rolelistings/open", {
          method: "GET",
          headers: {
              "Content-Type": "application/json"
          },
      });

      if (!response.ok) {
          console.error("Error fetching open role listings:", response.status);
      } else {
          const responseData = await response.json();
          return responseData;
      }
    } catch (error) {
        console.error("Error fetching open role listings:", error);
    }
  }

} 