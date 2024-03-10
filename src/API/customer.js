import axios from "axios";

export const getCustomers = async () => {
    const {data} = await axios.get("http://localhost:8080/v1/customers")
    return data.data
}

export const deleteCustomer = async (id) => {
    const {data} = await axios.delete(`http://localhost:8080/v1/customers/${id}`)
    return data.data
}

export const createCustomer = async (customer) => {
    const {data} = await axios.post("http://localhost:8080/v1/customers", customer)
    return data.data
}

export const updateCustomerFunc = async (customer) => {
    const {data} = await axios.put(`http://localhost:8080/v1/customers/${customer.id}`, customer)
    return data.data
}