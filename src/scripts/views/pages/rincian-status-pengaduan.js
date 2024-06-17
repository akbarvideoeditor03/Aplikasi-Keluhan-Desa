import supabase from "../../global/config.js";
import Swal from 'sweetalert2';
import { rincianPengaduan } from '../template/template-creator.js';
import UrlParser from '../../routes/url-parser.js';

const RincianStatusPengaduan = {
    async render() {
        return `
            <div class="content container col-container">
                <div>
                    <h2>Rincian Status Pengaduan</h2>
                </div>
                <div id="rincian_pengaduan" class="container col-container card card-container">
                    
                </div>
            </div>
        `;
    },

    async afterRender() {
    }
}

export default RincianStatusPengaduan;