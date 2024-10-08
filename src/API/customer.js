import axios from "axios";

export const getCustomers = async () => {
    const {data} = await axios.get(import.meta.env.VITE_APP_BASE_URL + "/v1/customers")
    return data.data
}

export const deleteCustomer = async (id) => {
    const {data} = await axios.delete(`${import.meta.env.VITE_APP_BASE_URL}/v1/customers/${id}`)
    return data.data
}

export const createCustomer = async (customer) => {
    const {data} = await axios.post(import.meta.env.VITE_APP_BASE_URL + "/v1/customers", customer)
    return data.data
}

export const updateCustomerFunc = async (customer) => {
    const {data} = await axios.put(`${import.meta.env.VITE_APP_BASE_URL}/v1/customers/${customer.id}`, customer)
    return data.data
}