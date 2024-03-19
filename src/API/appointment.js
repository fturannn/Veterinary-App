import axios from "axios";

export const getAppointments = async () => {
    const {data} = await axios.get(import.meta.env.VITE_APP_BASE_URL + "/v1/appointments")
    return data.data
}

export const deleteAppointment = async (id) => {
    const {data} = await axios.delete(`${import.meta.env.VITE_APP_BASE_URL}/v1/appointments/${id}`)
    return data.data
}

export const createAppointment = async (appointment) => {
    const {data} = await axios.post(import.meta.env.VITE_APP_BASE_URL + "/v1/appointments", appointment)
    return data.data
}

export const updateAppointmentFunc = async (appointment) => {
    const {data} = await axios.put(`${import.meta.env.VITE_APP_BASE_URL}/v1/appointments/${appointment.id}`, appointment)
    return data.data
}

export const getAppointmentByDoctorAndDateRange = async (doctorId, startDate, endDate) => {
    const { data } = await axios.get (
      `${import.meta.env.VITE_APP_BASE_URL}/v1/appointments/doctorId?doctorId=${doctorId}&startDate=${startDate}&endDate=${endDate}`
    );
    return data;
  };
  
  export const getAppointmentByAnimalAndDateRange = async (animalId, startDate, endDate) => {
    const { data } = await axios.get (
      `${import.meta.env.VITE_APP_BASE_URL}/v1/appointments/animalId?animalId=${animalId}&startDate=${startDate}&endDate=${endDate}`
    );
    return data;
  };