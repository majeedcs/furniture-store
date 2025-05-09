export async function fetchData(resourceURI){
    try {
        const response = await fetch(resourceURI);
        if (!response.ok){
            throw new Error(`An error occurred: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        throw error;
    }
}
