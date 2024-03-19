import axios from "axios";

export const getVaccines = async () => {
  const { data } = await axios.get(
    import.meta.env.VITE_APP_BASE_URL + "/v1/vaccines"
  );
  return data.data;
};

export const deleteVaccine = async (id) => {
  const { data } = await axios.delete(
    `${import.meta.env.VITE_APP_BASE_URL}/v1/vaccines/${id}`
  );
  return data.data;
};

export const createVaccine = async (vaccine) => {
  const { data } = await axios.post(
    import.meta.env.VITE_APP_BASE_URL + "/v1/vaccines",
    vaccine
  );
  return data.data;
};

export const updateVaccineFunc = async (vaccine) => {
  const { data } = await axios.put(
    `${import.meta.env.VITE_APP_BASE_URL}/v1/vaccines/${vaccine.id}`,
    vaccine
  );
  return data.data;
};

export const getUpcomingVaccines = async (startDate, endDate) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_APP_BASE_URL}/v1/vaccines/upcomings?startDate=${startDate}&endDate=${endDate}`,
    startDate, endDate
  );
  return data.data;
};
