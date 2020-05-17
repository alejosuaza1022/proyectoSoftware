<template>
  <div class="login">
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
      <b-button  @click="login()" variant="outline-danger">Log in</b-button>
    </b-form>
  </div>
</template>

<script src="../assets/loginAutor.js"/>



<style>
.login {
  margin: auto;
  width: 50%;
  border: 3px solid red;
  border-radius: 10px;
  padding: 10px;
  margin-top: 100px;
}

</style>
