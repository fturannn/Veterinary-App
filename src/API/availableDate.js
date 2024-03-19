import axios from "axios";

export const getAvailableDates = async () => {
    const {data} = await axios.get(import.meta.env.VITE_APP_BASE_URL + "/v1/availableDates")
    return data.data
}

export const deleteAvailableDate = async (id) => {
    const {data} = await axios.delete(`${import.meta.env.VITE_APP_BASE_URL}/v1/availableDates/${id}`)
    return data.data
}

export const createAvailableDate = async (availableDate) => {
    const {data} = await axios.post(import.meta.env.VITE_APP_BASE_URL + "/v1/availableDates", availableDate)
    return data.data
}

export const updateAvailableDateFunc = async (availableDate) => {
    const {data} = await axios.put(`${import.meta.env.VITE_APP_BASE_URL}/v1/availableDates/${availableDate.id}`, availableDate)
    return data.data
}