<template>
    <div class="p-3 border rounded shadow-sm">
        <div class="d-flex justify-content-between"> 
            <div>    
                <h3 class="text-dark">Comparaison</h3>
            </div>
            <div> 
                <a class="btn btn-danger btn-sm" v-on:click="$emit('close-comparator')" href="javascript:void(0)">Fermer</a> 
            </div>
        </div>
        <hr>
        <div>
            <div class="text-center fw-bolder">Candidats sélectionnés</div>
            <div class="row">
                <div v-for="user in candidats" v-bind:key="user" class="col-lg-4 col-md-6 col-sm-12">
                    <CandidatForComparator :user="user" />
                </div>
            </div>
        </div>
        <hr>
        <div>
            <div class="text-center fw-bolder mb-2">Tableaux de comparaison</div>  
            <div v-if="stats" class="row justify-content-center">
                <div class="col-md-4 col-sm-12 border p-3 m-1 rounded">
                    <TableFollowers :candidats="stats.candidatsOrderByFollowers"/>
                </div>
                <div class="col-md-4 col-sm-12 border p-3 m-1 rounded">
                    <TableFollowing :candidats="stats.candidatsOrderByFollowing"/>
                </div>
                <div class="col-md-4 col-sm-12 border p-3 m-1 rounded">
                    <TableRepos :candidats="stats.candidatsOrderByPublicRepos"/>
                </div>
                <div class="col-md-4 col-sm-12 border p-3 m-1 rounded">
                    <TableProfilQuality :candidats="stats.candidatsOrderCandidatsByProfileQuality"/>
                </div>
            </div>
        </div>

    </div>  
</template>

<script>

import CandidatForComparator from "./Candidat/CandidatForComparator.vue";
import TableFollowers from "./Comparator/TableFollowers.vue";
import TableFollowing from "./Comparator/TableFollowing.vue";
import TableRepos from "./Comparator/TableRepos.vue";
import TableProfilQuality from "./Comparator/TableProfilQuality.vue";

export default {

    name:"Comparator",

    components:{
      
      CandidatForComparator,
      TableFollowers,
      TableFollowing,
      TableRepos,
      TableProfilQuality

    },

    props:['stats','candidats'],

}
</script>