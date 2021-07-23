<template>
    <div class="shadow-sm ps-4 pe-4 d-flex justify-content-center">
        <div id="search-container" class="d-flex flex-wrap justify-content-center align-items-center">
            <div class="search-container-title text-center mb-2">
                <span class="fw-bold search-container-title">
                    GitInspector <i class="fa fa-user-secret"></i>
                </span>
            </div>  
            <div class="mb-2 pt-2">
                <form @submit.prevent="search">
                    <div class="search-box border shadow-sm">
                        <input 
                            v-model="searchQuery"
                            type="text" class="form-control" placeholder="Nom d'utilisateur du candidat"
                        >
                        <button type="submit" class="btn btn-sm btn-success"><i class="fa fa-search small"></i></button>
                    </div>
                </form>
            </div>
            <div class="search-container-options">
                <div class="text-end text-center">
                    <span><a @click="compareCandidat" href="javascript:void(0)" class="text-decoration-none text-dark"><i class="fa fa-less-than-equal"></i> Comparer</a></span> 
                    &nbsp; &nbsp; 
                    <span><a @click="openHistory" href="javascript:void(0)" class="text-decoration-none text-dark"><i class="fa fa-history"></i> Historique</a></span> 
                    &nbsp; &nbsp; 
                    <span><a href="/" class="text-dark text-decoration-none"><i class="fa fa-sign-out-alt"></i> Déconnexion</a></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    
    name:"Navbar",

    data(){
        return {
            searchQuery:"test"
        }
    },

    mounted(){
        this.search();
    },

    methods: {
        search(){
            this.$emit("search",this.searchQuery);
        },

        compareCandidat(){
            this.$emit("compare-candidats");
        },

        openHistory(){
            this.$emit("open-history");
        }
    }


}
</script>

<style scoped>
#search-container{
    padding: 10px;
}

.search-container-title{
    font-size: 1.2em;
}

.search-container-title{
    width: 400px;
}

.search-box{
    width: 400px;
    padding: 3px 5px 3px 10px;
    display: flex;
    border-radius: 50px;
}

.search-container-options{
    width: 400px;
}

.search-box input{
    border: none;
}

.search-box input:focus{
    box-shadow: none;
}

.search-box button{
    border: none;
    color: #fff;
    border-radius: 50px;
    padding: 5px 20px 5px 20px;
}

</style>