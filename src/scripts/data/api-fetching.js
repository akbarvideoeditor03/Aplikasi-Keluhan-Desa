import ENDPOINT_OF_API from "../globals/endpoint";

class FetchApiSource {
    static async data_page() {
        const response = await fetch(ENDPOINT_OF_API.DATA);
        const responseJson = await response.json();
        return responseJson.data;
    }
}

export default FetchApiSource;