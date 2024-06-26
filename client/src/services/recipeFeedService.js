export const getRecipeFeed = async (userID) => {
	const url = `http://localhost:5050/recipe/following/${userID}`;

	try {
		const response = await fetch(url);
    const data = await response.json();

		if (response.ok) {
			return { success: true, data };
		}
		else {
			alert(`Failed to get recipe feed: ${data.error}`);
			return { success: false, error: data.error };
		}
	}
	catch (error) {
		console.error("Error in getRecipeFeed():", error);
		return { success: false, error: error };
	}
};