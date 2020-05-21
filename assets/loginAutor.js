import Axios from "axios";
import config from "./config"
export default {
    data() {
        return {
            message: '',
            model_header_color: '',
            model_tbody_color: '',
            autor: {
                id: '',
                clave: ''
            }
        };
    },
    methods: {
        login() {

            if (this.autor.id.length === 0 || this.autor.clave.length === 0) {
                this.model_header_color = "danger";
                this.model_tbody_color = "danger  ";
                this.message = 'Clave y usuario obligatorios'
                this.$bvModal.show("modal-1");
                return
            }

            Axios.post(config.url_api + "/autor/login", {
                    id: this.autor.id,
                    clave: this.autor.clave,

                }).then(res => {

                    if (res) {
                        this.agregarInfoLS({ idautor: this.autor.id, token: res.data['info'], nombre: res.data['nombre'] })

                    }
                    this.$router.push({ path: "autorPrincipa", query: { nombre: res.data['nombre'] } });
                })
                .catch(err => {
                    this.model_header_color = "danger";
                    this.model_tbody_color = "danger  ";
                    this.message = 'Claves y/o usuario erroneos'
                    this.$bvModal.show("modal-1");

                });


        },
        agregarInfoLS(item) {
            localStorage.setItem('Autor', JSON.stringify(item));
        },

    }
};