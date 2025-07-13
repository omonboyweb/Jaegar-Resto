const URL = "https://admin-json-server.vercel.app"

export async function getApi(path, id) {
    try {
        const res = await fetch(`${URL}/${path}${id ? `/${id}` : ""}`)
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error);
    }
}