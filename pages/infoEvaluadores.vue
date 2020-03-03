<template>
  <div>
    <b-container>
      <!-- Content here -->

      <h1>Gestión de estudiantes</h1>
      {{mensaje}}
      {{estudiante.nombre}}
      <br />

      <b-form action="javascript:void(0)" @submit="crearEstudiante()">
        <b-form-group label="Identificación" label-for="id">
          <b-form-input
            class="form-control"
            type="number"
            v-model="estudiante.id"
            placeholder="Ingrese su identificación"
            id="id"
          />
        </b-form-group>
        <b-form-group label="Nombre" label-for="nombre">
          <b-form-input
            class="form-control"
            v-model="estudiante.nombre"
            placeholder="Ingrese su nombre"
            id="nombre"
          />
        </b-form-group>
        <b-form-group label="Edad" label-for="edad">
          <b-form-input
            class="form-control"
            type="number"
            v-model="estudiante.edad"
            placeholder="Ingrese su edad"
            id="edad"
          />
        </b-form-group>

        <b-form-group label="Correo" label-for="correo">
          <b-form-input
            class="form-control"
            type="email"
            v-model="estudiante.correo"
            id="correo"
            placeholder="Ingrese su correo"
          />
        </b-form-group>

        <b-form-group>
          <b-form-select v-model="estudiante.carrera" :options="opciones_carrera"></b-form-select>
        </b-form-group>

        <b-button type="submit" variant="primary" v-if="!enEdicion">Crear estudiante</b-button>
        <b-button @click="actualizarEstudiante()" variant="primary" v-else>Actualizar estudiante</b-button>
      </b-form>

      <b-table striped hover :items="lista_estudiantes">
        <template v-slot:cell(acciones)="row">
          <b-button size="sm" @click="cargarEstudiante(row)" class="mr-2">Modificar</b-button>
          <b-button size="sm" @click="eliminarEstudiante(row)" class="mr-2">Eliminar</b-button>
        </template>
      </b-table>
    </b-container>
  </div>
</template>

<script src="@/assets/infoEvaluadores.js"/>