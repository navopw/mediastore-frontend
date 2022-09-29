import axios from 'axios'
import { Buffer } from 'buffer';

import Config from '../Config'

// Set base url
axios.defaults.baseURL = Config.pocketbase + "/api"

export const listMedia = async () => {
    const { data } = await axios.get('/media/list')
    return data
}

// Returns blob
export const getMedia = async (id: string) => {
    const { data } = await axios.get(`/media?id=${id}`, {
        responseType: "blob",
        maxContentLength: Infinity,
        maxBodyLength: Infinity
    })

    return data
}

// Returns base64
export const getMediaPreview = async (id: string) => {
    const { data } = await axios.get(`/media/preview?id=${id}`, { responseType: "arraybuffer" })
    
    if (data != null) {
        return Buffer.from(data, 'binary').toString('base64')
    } else {
        throw new Error("No data")
    }
}

export const deleteMedia = async (id: string) => {
    const { data } = await axios.delete(`/media?id=${id}`)
    return data
}

export const uploadMedia = async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    const { data } = await axios.post('/media', formData)
    return data
}