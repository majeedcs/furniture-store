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

export function createCustomElement(parent, newElemName, content) {
    const newElem = document.createElement(newElemName);
    newElem.textContent = content;
    parent.appendChild(newElem);
    return newElem;
}