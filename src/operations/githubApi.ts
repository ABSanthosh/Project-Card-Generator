import axios from "axios";

export const getRepo = async (owner: string, repo: string) => {
  return await axios.get(`https://api.github.com/repos/${owner}/${repo}`);
};
