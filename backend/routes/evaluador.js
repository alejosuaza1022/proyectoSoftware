const s_pg = require("../services/postgres")



let guardar_evaluador = async(req, res) => {
    let servicio = new s_pg();
    let evaluador = req.body;
    let sql = 'insert into evaluador(nombre,apellidos,ocupacion,idevaluador) values($1,$2,$3,$4);'
    await servicio.eje_sql(sql, [evaluador.nombre, evaluador.apellidos, evaluador.ocupacion, evaluador.idevaluador]).
    then(bd_res => {
        res.status(200).send({
            message: ' evaluador agregado ',
            evaluador: bd_res
        })
    }).catch(error => {
        res.status(500).send({
            message: 'se detecto un error',
            error: error
        });
    })


}

let obtener_evaluadores = async(req, res) => {
    let servicio = new s_pg();
    let sql = 'select nombre,apellidos,ocupacion,idevaluador from evaluador;'
    await servicio.eje_sql(sql).then(bd_res => {
        res.status(200).send({
            message: ' exitoso ',
            evaluador: bd_res.rows
        });
    }).catch(e => {
        res.status(500).send({
            message: 'se detecto un error',
            error: error
        });
    });
}

let obtener_evaluador = async(req, res) => {
    let servicio = new s_pg();
    let id_evaluador = req.params.id;
    let sql = 'select nombre,apellidos,ocupacion,idevaluador from evaluador where idevaluador = $1;'
    await servicio.eje_sql(sql, [id_evaluador]).then(bd_res => {
        res.status(200).send({
            message: ' evaluador agregado ',
            evaluador: bd_res.rows[0]
        })
    }).catch(error => {
        res.status(500).send({
            message: 'se detecto un error',
            error: error
        });
    });

}

let actualizar_evaluador = async(req, res) => {
    let servicio = new s_pg();
    let evaluador = req.body;
    let id_evaluador = req.params.id;
    let sql = 'update evaluador set nombre = $1' +
        'apellidos = $2 ,ocupacion = $3,idevaluador = $4 where idevaluador = $5;'
    await servicio.eje_sql(sql, [evaluador.nombre, evaluador.apellidos, evaluador.ocupacion, evaluador.idevaluador, id_evaluador]).
    then(bd_res => {
        res.status(200).send({
            message: ' evaluador agregado ',
            evaluador: bd_res.rows[0]
        });
    }).catch(error => {
        res.status(500).send({
            message: 'se detecto un error',
            error: error
        });
    });
}

let eliminar_evaluador = async(req, res) => {
    let servicio = new s_pg();
    let id_evaluador = req.params.id
    let sql = 'delete from evaluador where idevaluador = $1 ;'
    await servicio.eje_sql(sql, [id_evaluador]).then(bd_res => {
        res.status(200).send({
            message: ' eliminado ',
            evaluador: bd_res
        });
    }).catch(e => {
        res.status(500).send({
            message: 'se detecto un error',
            error: error
        });
    });


}

module.exports = {
    guardar_evaluador,
    obtener_evaluador,
    obtener_evaluadores,
    actualizar_evaluador,
    eliminar_evaluador
}