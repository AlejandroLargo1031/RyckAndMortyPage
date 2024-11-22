
export async function getAllCharacters(url) {
    return new Promise((res, rej) => {
        fetch(url)
           .then(response => response.json())
           .then(data => res(data))
           .catch(err => rej(err));
    })
}

export async function getCharacterById(url, id) {
    const fullUrl = `${url}/${id}`; // Concatenar la URL base con el ID
    const response = await fetch(fullUrl);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}