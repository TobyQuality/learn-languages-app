import axios from "axios";
const baseUrl = "http://localhost:8080/api/login";

/**
 * Logs in a user with provided credentials.
 * @param {Object} credentials - User login credentials.
 * @returns {Object} - User information and token.
 */
const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { login };
