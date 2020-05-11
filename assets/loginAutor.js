import Axios from "axios";

export default {
    data() {
        return {
            autor: {
                id: null,
                clave: null
            }
        };
    },
    methods: {
        login() {
            Axios.post("http://localhost:4000/api/autor/login", {
                    id: this.autor.id,
                    clave: this.autor.clave
                }).then(res => {

                    if (res) {
                        this.agregarInfoLS({ idautor: this.autor.id, token: res.data['info'], nombre: res.data['nombre'] })

                    }
                    this.$router.push({ path: "autorPrincipa", query: { nombre: res.data['nombre'] } });
                })
                .catch(err => (console.log("ha ocurrido el error :" + err)));


        },
        agregarInfoLS(item) {
            localStorage.setItem('Autor', JSON.stringify(item));
        },

    }
};