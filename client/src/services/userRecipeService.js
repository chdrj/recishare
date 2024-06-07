export const getUserRecipes = async (id) => {
	const url = `http://localhost:5050/recipe/user/${id}`;

	try {
		const response = await fetch(url);
		const data = await response.json();

		if (response.ok) {
			return { success: true, data: data };
		}
		else {
			console.error(`Failed to get user recipes: ${data.error}`);
			return { success: false, error: data.error };
		}
	}
	catch (error) {
		console.error("Error in getUserRecipes():", error);
		return { success: false, error: error };
	}
}