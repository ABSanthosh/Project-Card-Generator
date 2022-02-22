import axios from "axios";

export const getRepo = async (owner: string, repo: string) => {
  return await axios.get(`https://api.github.com/repos/${owner}/${repo}`);
};

export const isGitHubRepo = async (owner: string, repo: string) => {
  const googleProxyURL =
    "https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=";
  const url = encodeURIComponent(`https://github.com/${owner}/${repo}`);
  return await axios.get(`${googleProxyURL}${url}`);
};
