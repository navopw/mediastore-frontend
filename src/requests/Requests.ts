import axios from 'axios'

// Set base url
axios.defaults.baseURL = 'http://localhost:8080'

export const listMedia = async () => {
    const { data } = await axios.get('/media/list')
    return data
}

export const uploadMedia = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    const { data } = await axios.post('/media', formData)
    return data
}