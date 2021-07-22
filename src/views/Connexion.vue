<template>

    <main>
        <div class="logo-container">
            <span class="fw-bold text-white h4">GitInspector <i class="fa fa-user-secret"></i></span>
        </div>  
        <div id="login-form-overlay"></div>
        <div id="login-form">
            <div class="content d-flex flex-column justify-content-center align-items-center">
                <img src="../assets/cp_avatar.png" alt="" width="90">
                <div class="mt-3 mb-3 text-white">
                    <template v-if="processing">
                        <div>
                            <span class="spinner-border spinner-border-sm text-white" role="status" aria-hidden="true"></span> &nbsp; {{ loginProcessMessage }}
                        </div>
                    </template>
                    <template v-if="!processing">
                        <div v-if="!usernameChecked">Connexion</div>
                        <div v-if="usernameChecked" class="fw-bolder">Bienvenue {{ username }}</div>
                    </template>
                </div>
                <div class="mb-3">
                    <form v-on:submit.prevent="startAuthentication">
                        
                        <input v-if="showUsername" class="login-form-input form-control border-0 shadow" type="text" name="username" placeholder="Entrer votre nom d'utilisateur" v-model="username" v-bind:disabled="processing">

                        <input v-if="showPassword" class="login-form-input form-control border-0 shadow" type="password" name="username" placeholder="Entrer votre mot de passe" v-model="password" v-bind:disabled="processing">

                    </form>
                </div>
                <div>
                    <template v-if="processing">
                        <div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </main>

</template>

<script>

document.title = 'GitInpector - Connexion'

export default {

    name:'Connexion',
    
    data(){
        return {

            usernameChecked:false,

            processing:false,

            showUsername:true,

            showPassword: false,

            checkingUsername:false,

            loginProcessMessage:null,

            username:null,
             
            password:null,

        }
    },

    methods: {
        startAuthentication(){

            var vm = this;

            if(this.username && !this.usernameChecked){

                this.loginProcessMessage = "Vérification en cours. Patientez 15 secondes...";

                this.processing = true;

                setTimeout(function(){

                    vm.showPassword = true;

                    vm.showUsername = false;

                    vm.usernameChecked = true;

                    vm.processing = false;

                },1000);

            }else if(this.password && !this.passwordChecked){

                this.loginProcessMessage = "Vérification en cours. Patientez encore 😊 15 secondes...";

                this.processing = true;

                this.passwordChecked = true;

                setTimeout(function(){

                    vm.$router.push('/recherche/candidat');

                },1000)

            }

        },

    }

}

</script>

<style scoped>
main{
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url("../assets/login_page_bg.jpg");
    background-size: cover;
    position: relative;
}

#login-form{
    text-align: center;
    position: absolute;
}

.login-form-input{
    border-radius: 20px;
    text-align: center;
    width: 280px;
}

.login-form-input.form-control:disabled, .form-control[readonly] {
    background-color: #6c6e6f;
    opacity: 1;
}

#login-form-overlay{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.6;
}

.logo-container{
    position: absolute;
    z-index: 50;
    top: 20px;
    left: 40px
}

</style>
