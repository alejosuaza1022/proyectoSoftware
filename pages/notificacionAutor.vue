<template>
<b-container>
    <b-form-group label="id autor" label-for="id_autor">
            <b-form-input
              class="form-control"
              type="number"
              id="id_autor"
              v-model="prop.id_autor"
              v-bind:required="true"
              placeholder="Ingrese el id autor"
            />
          </b-form-group>
      <b-button @click="mostrarData()"  variant="danger"  >ver evaluación propuestas</b-button>
       <b-table striped hover :items="lista_propuestasautor">
      </b-table>
</b-container>
        
</template>
<style>
        @import '../assets/sizes.css';


</style>
<script src="../assets/notificacionAutor.js"/>
