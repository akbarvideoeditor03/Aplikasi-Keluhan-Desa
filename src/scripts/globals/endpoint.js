import CONFIG from "./config";

const ENDPOINT_OF_API = {
    allData: `${CONFIG.baseURL}/endpoint/get_all_user`,
    deleteData: (id) => `${CONFIG.baseURL}/endpoint/delete_user?id=${id}`
};

export default ENDPOINT_OF_API;