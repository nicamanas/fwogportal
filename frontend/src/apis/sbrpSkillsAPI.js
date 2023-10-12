export const SBRPSkillsAPI = {
    get: async function (id) {
        try {
            const response = await fetch(`http://localhost:8003/skill_details/${id}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
        
            if (!response.ok) {
                console.error("Error fetching skill:", response.status);
            } else {
                const responseData = await response.json();
                return responseData;
            } 
        } catch (error) {
            console.error("Error fetching skill:", error);
        }
    },
    getAll: async function (id) {
        try {
            const response = await fetch(`http://localhost:8003/skill_details/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (!response.ok) {
                console.error("Error fetching skill:", response.status);
            } else {
                const responseData = await response.json();
                return responseData;
            }
        } catch (error) {
            console.error("Error fetching skill:", error);
        }
    },
    update: async function (id, skill) {
        try {
            const response = await fetch(`http://localhost:8003/skill_details/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(skill)
            });

            if (!response.ok) {
                console.error("Error updating skill:", response.status);
            } else {
                const responseData = await response.json();
                return responseData;
            }
        } catch (error) {
            console.error("Error updating skill:", error);
        }
    }

}