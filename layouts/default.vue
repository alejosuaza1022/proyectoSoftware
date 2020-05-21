<template>
  <div>
    
   <b-navbar toggleable type="light" variant="faded" >
      <b-img
      center
        src="https://redunete.net/wp-content/uploads/2019/02/logo-blanco-Udem-700x300.jpg"
        fluid
        alt="Center image"
        width="200px"
        
      ></b-img>



    </b-navbar>
     <div>
      <b-navbar toggleable="md" type="dark" variant="danger">
        <b-navbar-nav>
               <b-nav-item :to="{ name: 'loginEvaluador' }"
              class="margin">Soy Evaluador</b-nav-item
            >
            <b-nav-item :to="{ name: 'loginAutor' }"
              class="margin">Soy Autor</b-nav-item
            >
          
          </b-navbar-nav>
      </b-navbar>
    </div>

    <nuxt />
  </div>
</template>

<style>
    
    .dropdown-item:active{
        background: #DC3546;    
    }
    
    html {
      font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI",
        Roboto, "Helvetica Neue", Arial, sans-serif;
      font-size: 16px;
      word-spacing: 1px;
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
      -moz-osx-font-smoothing: grayscale;
      -webkit-font-smoothing: antialiased;
      box-sizing: border-box;
    }
    *,
    *:before,
    *:after {
      box-sizing: border-box;
      margin: 0;
    }
    .button--green {
      display: inline-block;
      border-radius: 4px;
      border: 1px solid #3b8070;
      color: #3b8070;
      text-decoration: none;
      padding: 10px 30px;
    }
    .button--green:hover {
      color: #fff;
      background-color: #3b8070;
    }
    .button--grey {
      display: inline-block;
      border-radius: 4px;
      border: 1px solid #35495e;
      color: #35495e;
      text-decoration: none;
      padding: 10px 30px;
      margin-left: 15px;
    }
    .button--grey:hover {
      color: #fff;
      background-color: #35495e;
    }
    .a :hover{
      
      background: #DC3546;
    }
    body{
  
    background-image: url("../images/background-01.png");
  background-repeat: no-repeat;
  background-size: cover; 
    }
    .margin{
  margin-right: 20px;
}
.bcard {
  margin-top: 30px;
  background-color: white;
  border-radius: 30px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-content: stretch;
  -webkit-box-shadow: -7px 7px 26px 0px rgba(150, 150, 150, 1);
  -moz-box-shadow: -7px 7px 26px 0px rgba(150, 150, 150, 1);
  box-shadow: -7px 7px 26px 0px rgba(150, 150, 150, 1);
}
</style>