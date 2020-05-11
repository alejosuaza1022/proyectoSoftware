const axios = require("axios");
const url = 'localhost:4000/api/'
export default {
    beforeMount() {
        localStorage.removeItem('Evaluador')
    },
    data() {
        return {
            mensaje: '',

            evaluador: {
                idevaluador: null,
                clave: null
            }
        };
    },
    methods: {
        login() {
            console.log(this.evaluador.idevaluador, this.evaluador.clave)
            axios.post("http://localhost:4000/api/evaluador/login", {
                    id: this.evaluador.idevaluador,
                    clave: this.evaluador.clave
                }).then(res => {

                    if (res) {
                        this.agregarInfoLS({ idevaluador: this.evaluador.idevaluador, token: res.data['info'], nombre: res.data['nombre'] })

                    }
                    this.$router.push({ path: "evaluadorPrincipal", query: { nombre: res.data['nombre'] } });
                })
                .catch(err => (console.log("ha ocurrido el error :" + err)));


        },
        agregarInfoLS(item) {
            localStorage.setItem('Evaluador', JSON.stringify(item));
        },


    },

};