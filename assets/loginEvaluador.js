const axios = require("axios");
const url = 'localhost:4000/api/'
export default {
    beforeMount() {
        localStorage.removeItem('Evaluador')
    },
    data() {
        return {

            message: '',
            mensaje: '',
            model_header_color: '',
            model_tbody_color: '',

            evaluador: {
                idevaluador: '',
                clave: ''
            }
        };
    },
    methods: {

        login() {
            if (this.evaluador.idevaluador.length === 0 || this.evaluador.clave.length === 0) {
                this.model_header_color = "danger";
                this.model_tbody_color = "danger  ";
                this.message = 'Clave y usuario obligatorios'
                this.$bvModal.show("modal-1");
                return
            }
            console.log(this.evaluador.idevaluador, this.evaluador.clave)
            axios.post("http://localhost:4000/api/evaluador/login", {
                    id: this.evaluador.idevaluador,
                    clave: this.evaluador.clave,
                }).then(res => {

                    if (res) {
                        this.agregarInfoLS({
                            idevaluador: this.evaluador.idevaluador,
                            token: res.data['info'],
                            nombre: res.data['nombre']
                        })

                    }
                    this.$router.push({
                        path: "evaluadorPrincipal",
                        query: {
                            nombre: res.data['nombre']
                        }
                    });
                })
                .catch(err => {
                        this.model_header_color = "danger";
                        this.model_tbody_color = "danger  ";
                        this.message = 'Claves y/o usuario erroneos'
                        this.$bvModal.show("modal-1");
                    }

                );


        },
        agregarInfoLS(item) {
            localStorage.setItem('Evaluador', JSON.stringify(item));
        },


    },

};