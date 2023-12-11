const config = require('../../package.json').projectConfig;
const BACKEND_BASE_URL = config.backendApiBaseUrl;

const BACKEND_API = {
    BASE_API_URL: `${BACKEND_BASE_URL}`
};

export default {
    BACKEND_API
};