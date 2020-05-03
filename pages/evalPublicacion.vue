<template>
<b-container>
    <b-form-group label="id propuesta" label-for="id_propuesta">
            <b-form-input
              class="form-control"
              type="number"
              id="id_autor"
              v-model="prop.id_propuesta"
              v-bind:required="true"
              placeholder="Ingrese el id propuesta"
            />
          </b-form-group>
      <b-button @click="mostrarData()"  variant="danger"  >ver evaluación propuestas</b-button>
       <b-table striped hover :items="lista_propuestasEval">
      </b-table>
</b-container>
        
</template>
<style>
        @import '../assets/sizes.css';


</style>
<script src="../assets/evalPublicacion.js"/>
