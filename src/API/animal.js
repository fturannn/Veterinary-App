import axios from "axios";

export const getAnimals = async () => {
  const { data } = await axios.get(
    import.meta.env.VITE_APP_BASE_URL + "/v1/animals"
  );
  return data.data;
};

export const deleteAnimal = async (id) => {
  const { data } = await axios.delete(
    `${import.meta.env.VITE_APP_BASE_URL}/v1/animals/${id}`
  );
  return data.data;
};

export const createAnimal = async (animal) => {
  const { data } = await axios.post(
    import.meta.env.VITE_APP_BASE_URL + "/v1/animals",
    animal
  );
  return data.data;
};

export const updateAnimalFunc = async (animal) => {
  const { data } = await axios.put(
    `${import.meta.env.VITE_APP_BASE_URL}/v1/animals/${animal.id}`,
    animal
  );
  return data.data;
};

export const getAnimalByName = async (name) => {
  const { data } = await axios.get(
    `${import.meta.env.VITE_APP_BASE_URL}/v1/animals/name=${name}`
  );
  return data.data;
};

export const getAnimalByCustomerName = async (customerName) => {
  const { data } = await axios.get(
    `${
      import.meta.env.VITE_APP_BASE_URL
    }/v1/animals/customerName=${customerName}`
  );

  return data.data;
};
