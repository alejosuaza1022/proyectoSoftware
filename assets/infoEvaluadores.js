import Axios from "axios";

export default {
    data() {
        return {
            aux: null,
            mensaje: "Formulario nuevos evaluadores",
            enEdicion: false,
            evaluador: {
                nombre: "",
                apellidos: "",
                idevaluador: "",
                email: "",
                afiliacion: "",
                cargo: "",
                clave: ""
            },
            lista_evaluadores: [],

        };
    },
    beforeMount() {
        this.aux = this.$route.query.actu == 1 ? true : false;
        if (this.aux) {
            let evaluador = JSON.parse(localStorage.getItem("Evaluador"));
            let token = evaluador.token;
            let ideval = evaluador.idevaluador;
            Axios.get(`http://localhost:4000/api/evaluador/${ideval}`, {
                headers: {
                    token
                }
            }).then(res => {

                this.evaluador = res.data.evaluador;
                //  this.agregarInfoLS();

            }).catch(error => {
                console.log(error)
            })

        }
    },
    mounted() {
        this.created()
    },
    methods: {

        crearEvaluador() {
            let evaluador = JSON.parse(localStorage.getItem("Evaluador"));
            let token = evaluador.token;
            let ideval = evaluador.idevaluador;
            Axios.post('http://localhost:4000/api/evaluador/', this.evaluador).then(res => {
                console.log(res)
                    //this.lista_evaluadores.push(this.evaluador);
                    //this.agregarInfoLS();
                this.evaluador = {
                        nombre: "",
                        apellidos: "",
                        idevaluador: "",
                        email: "",
                        afiliacion: "",
                        cargo: "",
                        clave: ""
                    },
                    this.$router.push('loginEvaluador')

            }).catch(error => {
                console.log(error)

            })


        },
        eliminarEstudiante({
            item
        }) {
            let posicion = this.lista_evaluadores.findIndex(
                evaluador => evaluador.cc == item.cc
            );
            this.lista_evaluadores.splice(posicion, 1);
            this.agregarInfoLS();
        },
        agregarInfoLS() {
            localStorage.setItem('registroEvalu', JSON.stringify(this.lista_evaluadores));
        },

        actualizarEvaluador() {
            let evaluador = JSON.parse(localStorage.getItem("Evaluador"));
            let token = evaluador.token;
            let ideval = evaluador.idevaluador;
            Axios.put(`http://localhost:4000/api/evaluador/${ideval}`, this.evaluador, {
                headers: {
                    token
                }
            }).then(res => {
                console.log(res)

                this.evaluador = {
                        nombre: "",
                        apellidos: "",
                        idevaluador: "",
                        email: "",
                        afiliacion: "",
                        cargo: "",
                        clave: ""
                    },
                    this.$router.push('loginEvaluador')

            }).catch(error => {
                console.log(error)

            })


        },
        // verificar existencia de datos o creación de intancia nueva
        created() {
            let datosLS = JSON.parse(localStorage.getItem('registroEvalu'));
            if (!datosLS)
                this.lista_evaluadores = [];
            else
                this.lista_evaluadores = datosLS;
        },

    }
}