<template>

<main>
    <div>   
        <div class="shadow-sm ps-4 pe-4 d-flex justify-content-center">
            <div id="search-container" class="d-flex flex-wrap justify-content-center align-items-center">
                <div class="search-container-title text-center mb-2">
                    <span class="fw-bold search-container-title">
                        GitInspector <i class="fa fa-user-secret"></i>
                    </span>
                </div>  
                <div class="mb-2 pt-2">
                    <form v-on:submit.prevent="search">
                        <div class="search-box border shadow-sm">
                            <input type="text" class="form-control" placeholder="Nom d'utilisateur du candidat" v-model="searchQuery">
                            <button type="submit" class="btn btn-sm btn-success"><i class="fa fa-search small"></i></button>
                        </div>
                    </form>
                </div>
                <div class="search-container-options">
                    <div class="text-end text-center">
                        <span><a v-on:click="compareCandidat" href="javascript:void(0)" class="text-decoration-none text-dark"><i class="fa fa-less-than-equal"></i> Comparer</a></span> 
                        &nbsp; &nbsp; 
                        <span><a v-on:click="openHistory" href="javascript:void(0)" class="text-decoration-none text-dark"><i class="fa fa-history"></i> Historique</a></span> 
                        &nbsp; &nbsp; 
                        <span><a href="/" class="text-dark text-decoration-none"><i class="fa fa-sign-out-alt"></i> Déconnexion</a></span>
                    </div>
                </div>
            </div>
        </div>

        <div class="pt-3 container-fluid">

            <div class="row mb-3">
                <div class="col-sm-12">
                    <div class="candidat-preview-header ps-4 pe-4 d-flex justify-content-between align-items-center flex-wrap">
                        <div class="mb-2">
                            <template v-if="users != null" >
                                <div class="fw-bold">TOP 10 affiché</div>
                                <div><span class="text-muted small">{{ total_count }} Résultats</span></div>
                            </template>
                        </div>
                        <div class="d-flex mb-2">
                            <template 
                                v-for="candidat in candidats"
                            >
                            <div 
                                v-if="candidat != null" v-bind:key="candidat"
                                class="candidat-bubble shadow-sm" v-bind:title="candidat.login"
                            >
                                <div class="avatar">
                                    <img v-bind:src="candidat.avatar_url" class="rounded-circle" width="30">
                                </div>
                                <div class="label">
                                    {{ candidat.login }}
                                </div>
                            </div>
                            </template>
                        </div>
                        <div>
                            <div v-if="searching" class="text-end">                 
                                <span class="spinner-border spinner-border-sm text-muted" role="status" aria-hidden="true"></span> <span>Recherche en cours</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div v-if="showCandidat" class="candidat-viewer row">
                <template v-if="searched">
                    <div v-for="user in users" v-bind:key="user" class="col-lg-4 col-md-6 col-sm-12">
                        <div 
                            v-on:click="selectCandidat(user)"
                            v-bind:class="[isCandidatSelected(user) ? 'border-success' : '' ]"
                            class="candidat-box mb-3 p-4 m-3 rounded shadow-sm border"
                        >
                            <div class="d-flex align-items-center mb-2">
                                <div class="me-3">
                                    <img v-bind:src="user.avatar_url" alt="" width="70" height="70" class="border rounded-circle">
                                </div>
                                <div>
                                    <div class="h4 mb-0"><a v-bind:href="user.html_url" target="_blank" class="text-dark" style="text-decoration:none">{{ user.login }}</a></div>
                                    <div><i class="fa fa-map-marker-alt text-success"></i>  {{ user.location ? user.location : "Aucune localisation" }} </div>
                                    <div class="small text-muted mb-2">
                                        <a v-bind:href="user.blog" class="text-muted " target="_blank" style="text-decoration:none">{{ user.blog }}</a>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p class="small mb-2">
                                    {{ user.bio ? user.bio : "Aucune biographie." }}
                                </p>
                            </div>
                            <div>
                                <div class="d-flex justify-content-between flex-wrap">
                                    <div class="me-5">
                                        <div class="fw-bold ">{{ user.followers }}</div>
                                        <div class="text-success small">FOLLOWERS</div>
                                    </div>
                                    <div class="me-5">
                                        <div class="fw-bold ">{{ user.following }}</div>
                                        <div class="text-success small">FOLLOWING</div>
                                    </div>
                                    <div>
                                        <div class="fw-bold ">{{ user.public_repos }}</div>
                                        <div class="text-success small">REPOS</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>

            <div v-if="showComparator" class="row">
                <div class="col-sm-12"> 
                    <div class="p-3 border rounded shadow-sm">
                        <div class="d-flex justify-content-between"> 
                            <div>    
                                <h3 class="text-dark">Comparaison</h3>
                            </div>
                            <div> 
                                <a class="btn btn-danger btn-sm" v-on:click="closeComparator" href="javascript:void(0)">Fermer</a> 
                            </div>
                        </div>
                        <hr>
                        <div>
                            <div class="text-center fw-bolder">Candidats sélectionnés</div>
                            <div class="row">
                                <div v-for="user in candidats" v-bind:key="user" class="col-lg-4 col-md-6 col-sm-12">
                                    <div  
                                        v-if="user != null"                               
                                        class="candidat-box mb-3 p-4 m-3 rounded shadow-sm border"
                                    >
                                        <div class="d-flex align-items-center mb-2">
                                            <div class="me-3">
                                                <img v-bind:src="user.avatar_url" alt="" width="70" height="70" class="border rounded-circle">
                                            </div>
                                            <div>
                                                <div class="h4 mb-0"><a v-bind:href="user.html_url" target="_blank" class="text-dark" style="text-decoration:none">{{ user.login }}</a></div>
                                                <div><i class="fa fa-map-marker-alt text-success"></i>  {{ user.location ? user.location : "Aucune localisation" }} </div>
                                                <div class="small text-muted mb-2">
                                                    <a v-bind:href="user.blog" class="text-muted " target="_blank" style="text-decoration:none">{{ user.blog }}</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                            <p class="small mb-2">
                                                {{ user.bio ? user.bio : "Aucune biographie." }}
                                            </p>
                                        </div>
                                        <div>
                                            <div class="d-flex justify-content-between flex-wrap">
                                                <div class="me-5">
                                                    <div class="fw-bold ">{{ user.followers }}</div>
                                                    <div class="text-success small">FOLLOWERS</div>
                                                </div>
                                                <div class="me-5">
                                                    <div class="fw-bold ">{{ user.following }}</div>
                                                    <div class="text-success small">FOLLOWING</div>
                                                </div>
                                                <div>
                                                    <div class="fw-bold ">{{ user.public_repos }}</div>
                                                    <div class="text-success small">REPOS</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr>
                        <div>  
                            <div class="text-center fw-bolder mb-2">Tableaux de comparaison</div>  
                            <div class="row justify-content-center">
                                <div class="col-md-4 col-sm-12 border p-3 m-1 rounded">
                                    <div class="fw-bold text-success small">TOP par followers</div>
                                    <div class="table-responsive">
                                        <table class="table table-lg">
                                            <thead>
                                                <tr>
                                                    <th>#Rang</th>
                                                    <th>Candidat</th>
                                                    <th>Followers</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(candidat, index) in stats.candidatsOrderByFollowers" v-bind:key="candidat">
                                                    <td>{{ index + 1 }}</td>
                                                    <td>
                                                        <img v-bind:src="candidat.avatar_url" alt="" width="25" height="25" class="border rounded-circle">
                                                        &nbsp; {{ candidat.login }}
                                                    </td>
                                                    <td>{{ candidat.followers }}</td>
                                                </tr>
                                            </tbody>        
                                        </table>
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-12 border p-3 m-1 rounded">
                                    <div class="fw-bold text-success small">TOP par following</div>
                                    <div class="table-responsive">
                                        <table class="table table-lg">
                                            <thead>
                                                <tr>
                                                    <th>#Rang</th>
                                                    <th>Candidat</th>
                                                    <th>Following</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(candidat, index) in stats.candidatsOrderByFollowing" v-bind:key="candidat">
                                                    <td>{{ index + 1 }}</td>
                                                    <td>
                                                        <img v-bind:src="candidat.avatar_url" alt="" width="25" height="25" class="border rounded-circle">
                                                        &nbsp; {{ candidat.login }}
                                                    </td>
                                                    <td>{{ candidat.following }}</td>
                                                </tr>
                                            </tbody>        
                                        </table>
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-12 border p-3 m-1 rounded">
                                    <div class="fw-bold text-success small">TOP par repos</div>
                                    <div class="table-responsive">
                                        <table class="table table-lg">
                                            <thead>
                                                <tr>
                                                    <th>#Rang</th>
                                                    <th>Candidat</th>
                                                    <th>Repos</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(candidat, index) in stats.candidatsOrderByPublicRepos" v-bind:key="candidat">
                                                    <td>{{ index + 1 }}</td>
                                                    <td>
                                                        <img v-bind:src="candidat.avatar_url" alt="" width="25" height="25" class="border rounded-circle">
                                                        &nbsp; {{ candidat.login }}
                                                    </td>
                                                    <td>{{ candidat.public_repos }}</td>
                                                </tr>
                                            </tbody>        
                                        </table>
                                    </div>
                                </div>
                                <div class="col-md-4 col-sm-12 border p-3 m-1 rounded">
                                    <div class="fw-bold text-success small">TOP par qualité de profil</div>
                                    <div class="table-responsive">
                                        <table class="table table-lg">
                                            <thead>
                                                <tr>
                                                    <th>#Rang</th>
                                                    <th>Candidat</th>
                                                    <th>Score</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="(candidat, index) in stats.candidatsOrderCandidatsByProfileQuality" v-bind:key="candidat">
                                                    <td>{{ index + 1 }}</td>
                                                    <td>
                                                        <img v-bind:src="candidat.avatar_url" alt="" width="25" height="25" class="border rounded-circle">
                                                        &nbsp; {{ candidat.login }}
                                                    </td>
                                                    <td>{{ candidat.score }}</td>
                                                </tr>
                                            </tbody>        
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>      
        </div>
    </div>
    <div id="history-box" v-if="showHistory">
        <div class="border-bottom p-3 pt-3 ps-4 pb-3 shadow-sm fw-bold d-flex justify-content-between align-items-center">
            <div>Historique</div>
            <div>
                <a v-on:click="closeHistory" class="btn btn-sm btn-light border">Fermer</a>
            </div>
        </div>
        <div class="p-3">
            <div v-for="entry in history" v-bind:key="entry">
                <div>Recherche: {{ entry.query }}</div>
                <div class="text-muted small">Date: {{ entry.date }}</div>
                <hr>
            </div>
        </div>
    </div>
</main>

</template>

<script>

document.title = 'GitInpector'

const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
    auth:'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',
})

export default {
    name:'RechercheCandidat',

    data(){
        return {

            total_count:0,

            showCandidat: true,

            showComparator: false,

            searchQuery:null,

            showHistory: false,

            searched:false,

            searching:false,

            users: null,

            candidats: [null, null, null],

            stats:{
                candidatsOrderByFollowers: [],
                candidatsOrderByFollowing: [],
                candidatsOrderByPublicRepos: [] 
            },

            history: [
                {
                    query:"jdjebi",
                    date: new Date()
                }
            ]

        }
    },

    mounted(){
        this.searchQuery = "test";
        this.search();
    },

    computed: {
        nbrNotNullCandidats: function(){
            let candidats = this.candidats;
            let nbrCandidats = candidats.length;
            let nbrNotNullCandidats = 0

            for(let i = 0; i < nbrCandidats; i++){
                if(this.candidats[i] != null)
                    nbrNotNullCandidats++;
            }

            return nbrNotNullCandidats;
        }
    },

    methods:{

        openHistory(){
            this.showHistory = true;
        },

        closeHistory(){
            this.showHistory = false;
        },

        search(){
            
            if(this.searchQuery){

                this.users = null;
                this.searching = true;
                this.searched = false;
                this.showCandidat = true;
                this.showComparator = false;

                this.addHistoryEntry(this.searchQuery);

                var vm = this;

                vm.users = [];

                (async () => {
                
                    const { data } = await octokit.request('GET /search/users', {
                                        q: vm.searchQuery,
                                        per_page:10,
                                        page:1
                                    })

                    vm.total_count = data.total_count;
                    
                    for (let i = 0; i < data.items.length; i++) {

                        let element = data.items[i];

                        let u = await octokit.request('GET /users/'+element.login)

                        let user = u.data;

                        vm.users.push(user);
                        
                    }

                    vm.searched = true;

                    vm.searching = false;

                })()
                .catch(function(error){
                    alert("Connexion à Github impossible: " + error.message);
                    vm.searching = false;
                    vm.users = null;
                });

            }

        },

        addHistoryEntry(query){

            this.history.unshift({
                query:query,
                date:new Date()
            });

        },

        selectCandidat(candidat){

            for (let i = this.candidats.length - 2; i > -1; i--) {

                this.candidats[i + 1] = this.candidats[i];
            }

            this.candidats[0] = candidat;

        },

        isCandidatSelected(candidat){

            let candidatsLength = this.candidats.length;

            for (let i = 0; i < candidatsLength; i++) {

                let c = this.candidats[i];

                if(c == null){
                    return false;
                }else if(candidat.login == c.login){
                    return true;
                }
            
            }

            return false;
        },

        closeComparator(){
            this.showComparator = false;
            this.showCandidat = true;
        },

        compareCandidat(){


            if(this.nbrNotNullCandidats > 1){

                let candidats = Array.from(this.candidats).filter(function(e){
                    return e != null;
                })
                
                this.stats.candidatsOrderByFollowers = this.orderCandidatsByStats("followers",candidats);
                this.stats.candidatsOrderByFollowing = this.orderCandidatsByStats("following",candidats);
                this.stats.candidatsOrderByPublicRepos = this.orderCandidatsByStats("public_repos",candidats);
                this.stats.candidatsOrderCandidatsByProfileQuality = this.orderCandidatsByProfileQuality(candidats);

                this.showComparator = true;
                this.showCandidat = false;

            }else{
                alert("Veuillez sélectionner au moins 2 candidats pour commencez la comparaison.");
            }

        },

        orderCandidatsByStats(key,baseCandidats){
                
            const nbrCandidats = baseCandidats.length;

            let candidats = Array.from(baseCandidats);

            console.log(candidats);

            let mustPermuted = true;

            do{
                mustPermuted = false;

                for(let i = 0; i < nbrCandidats - 1; i++){

                    let candidat = candidats[i];

                    if(candidat == null){
                        continue;
                    }else{

                        if(candidats[i][key] < candidats[i + 1][key]){

                            let tmp = candidats[i];
                            candidats[i] = candidats[i + 1];
                            candidats[i + 1] = tmp;
                            mustPermuted = true;
                            break;
                        }
                    }

                }

            }while(mustPermuted);

            return candidats;

        },

        orderCandidatsByProfileQuality(candidats){

            candidats.forEach(function(e){

                if(e == null)
                    return;

                e.score = 0;

                if(e.bio)
                    e.score++;
                if(e.blog)
                    e.score++;
                if(e.location)
                    e.score++;
            });

            return this.orderCandidatsByStats("score",candidats);

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

.candidat-box{
    cursor: pointer;
}

.candidat-box:hover{
    border: 1px solid #198754 !important;
}

#history-box{
    position:fixed;
    top:0;
    right:0;
    border: 1px solid #eee;
    width:330px;
    height: 100%;
    background:rgba(255, 255, 255);
    box-shadow: 2px 4px 5px;
    overflow-y: scroll;
}

.candidat-bubble{
    display: flex;
    padding: 5px 20px 5px 5px;
    align-items: center;
    border: 1px solid #eee;
    border-radius: 50px;
}

.candidat-bubble {
    margin-right: 5px;
    margin-left: 5px;
}

.candidat-bubble .avatar{
    margin-right: 5px;
}

.candidat-bubble .label{
    white-space: nowrap;
    overflow: hidden;
    width: 70px;
    text-overflow: ellipsis;
}

.candidat-preview-header > div{
    width: 400px;
}

</style>