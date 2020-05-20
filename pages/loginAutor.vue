<template>
  <div >
      <b-modal
      id="modal-1"
      :header-bg-variant="model_header_color"
      :body-text-variant="model_tbody_color"
      header-class="text-center"
      body-class="text-center"
      title="Udem dice"
      ok-only
    >
      <h4>
        {{message}}
      </h4>
    </b-modal>
    <b-container >
      <b-card class="bcard margin2">
    <b-form @submit="login">
      <b-form-group
        id="input-group-1"
        label="Numero de identificación:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="autor.id"
          type="text"
          required
          placeholder="ingrese id"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Clave" label-for="input-2" description="esta información es privada">
        <b-form-input
          id="input-2"
          v-model="autor.clave"
          required
          type="password"
          placeholder="ingrese  clave"
        ></b-form-input>
      </b-form-group>
      <b-button  @click="login()" block variant="danger">Log in</b-button>
    </b-form>
      </b-card>
    </b-container>
  </div>
</template>

<script src="../assets/loginAutor.js"/>



<style>
.margin2{
  margin-top:100px ;
}

</style>
