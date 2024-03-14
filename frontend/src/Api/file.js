import api from './index.js'
export const upload = async (file) => {
try {
    const data = new FormData()
    data.append("file", file)
    const res= await api.post("/upload", {
        body: data
    })
    console.log(res)
} catch (error) {
    console.log(error)
}
}