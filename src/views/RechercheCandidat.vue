<template>

<main>
    <div>   

        <Navbar 
            v-on:search="searchQuery = $event; search()"
            v-on:compare-candidats="compareCandidat"
            v-on:open-history="openHistory"
        />

        <div class="pt-3 container-fluid">

            <div class="row mb-3">
                <div class="col-sm-12">
                    <CandidatsPreviewBox 
                        :users="users" 
                        :totalCount="total_count"
                        :searching="searching"
                        :nbrNotNullCandidats="nbrNotNullCandidats"
                        :candidats="candidats"
                    />
                </div>
            </div>
            
            <div class="row" v-if="showCandidat">
                <template v-if="searched">
                    <div v-for="candidat in users" v-bind:key="candidat" class="col-lg-4 col-md-6 col-sm-12">
                        <CandidatCarte 
                            v-on:candidat-selected="selectCandidat(candidat)"
                            :selected="isCandidatSelected(candidat)"
                            :candidat="candidat"   
                        />
                    </div>
                </template>
            </div>

            <div class="row" v-if="showComparator">
                <div class="col-sm-12"> 
                    <Comparator 
                        v-on:close-comparator="closeComparator"
                        :stats="stats" 
                        :candidats="candidats" 
                    />
                </div>
            </div>      
        </div>
    </div>

    <HistoryBox 
        v-if="showHistory"
        v-on:close-history="closeHistory"  
        :history="history"
    />

</main>

</template>

<script>

import Navbar from "../components/RechercheCandidat/Navbar.vue";
import HistoryBox from "../components/RechercheCandidat/HistoryBox.vue";
import Comparator from "../components/RechercheCandidat/Comparator.vue";
import CandidatCarte from "./../components/RechercheCandidat/Candidat/CandidatCarte.vue";
import CandidatsPreviewBox from "../components/RechercheCandidat/CandidatsPreviewBox.vue";

document.title = 'GitInpector'

const { Octokit } = require("@octokit/rest");

var access_token = "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";

const octokit = new Octokit({
    auth:access_token,
})

export default {
    name:'RechercheCandidat',

    components:{
      Navbar,
      HistoryBox,
      Comparator,
      CandidatCarte,
      CandidatsPreviewBox
    },

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

            history: []

        }
    },

    mounted(){
        
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




</style>