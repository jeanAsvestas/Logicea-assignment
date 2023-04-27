import axios from 'axios';
import type { JokesInterface } from './types';

type action = 'post' | 'put';

const getJokeById = async (jokeId: string) => {
  return await axios.get(`https://retoolapi.dev/zu9TVE/jokes/${jokeId}`);
};

const getJokesByPage = async (currentPage: number, jokesPerPage: string) => {
  return await axios.get(
    `https://retoolapi.dev/zu9TVE/jokes?_page=${currentPage}&_limit=${jokesPerPage}`
  );
};

const addEditJoke = async (
  action: action,
  joke: JokesInterface,
  jokeId?: string
) => {
  if (action === 'put') {
    return await axios[action](
      `https://retoolapi.dev/zu9TVE/jokes/${jokeId}`,
      joke
    );
  }
  return await axios[action](`https://retoolapi.dev/zu9TVE/jokes`, joke);
};

const deleteJoke = async (jokeId: string) => {
  return axios.delete(`https://retoolapi.dev/zu9TVE/jokes/${jokeId}`);
};

const jokesApi = {
  getJokeById,
  getJokesByPage,
  addEditJoke,
  deleteJoke,
};

export default jokesApi;
