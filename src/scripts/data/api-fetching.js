import ENDPOINT_OF_API from "../globals/endpoint";

class FetchApiSource {
    static async data_page() {
        const response = await fetch(ENDPOINT_OF_API.allData);
        const responseJson = await response.json();
        const allData = responseJson.body;

        const dataUmum = allData.filter(user => user.role === 'pengguna');
        const dataKepalaDesaUnverified = allData.filter(user => user.role === 'kepala desa' && !user.isVerified);
        const dataKepalaDesaVerified =  allData.filter(user => user.role === 'kepala desa' && user.isVerified);
        const dataAdmin =  allData.filter(user => user.role === 'admin' && user.isVerified);

        return { dataUmum, dataKepalaDesaUnverified, dataKepalaDesaVerified, dataAdmin };
        }

        static async getDataById(id) {
            const response = await fetch (`${ENDPOINT_OF_API.allData}/${id}`);
            const responseJson = await response.json();
            return responseJson.body;
        }
}

export default FetchApiSource;

// const bodies = responseJson.data.map(item => item.body).join(', ');
// console.log(bodies);