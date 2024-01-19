import axios from "axios";
const baseUrl = "http://localhost:8080/api/users";

/**
 * Registers a new user with provided credentials.
 * @param {Object} credentials - User registration credentials.
 * @returns {Object} - User information and token.
 */
const register = async (credentials) => {
  const response = await axios.post(baseUrl, credentials);
  return response.data;
};

export default { register };
