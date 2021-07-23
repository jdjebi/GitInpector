<template>
    <div class="candidat-preview-header ps-4 pe-4 d-flex justify-content-between align-items-center flex-wrap">
        <div class="mb-2">
            <template v-if="users != null" >
                <div class="fw-bold">TOP 10 affiché</div>
                <div><span class="text-muted small">{{ totalCount }} Résultats</span></div>
            </template>
        </div>
        <div class="d-flex mb-2 justify-content-center">
            <template v-if="nbrNotNullCandidats > 0">

                <template v-for="candidat in candidats">
                    
                    <CandidatBulle v-if="candidat != null" v-bind:key="candidat" :candidat="candidat"/>
                
                </template>
            
            </template>
            <template v-else>
                <div class="text-muted">Aucun candidat sélectionné</div>
            </template>
        </div>
        <div>
            <div v-if="searching" class="text-end">                 
                <span class="spinner-border spinner-border-sm text-muted" role="status" aria-hidden="true"></span> <span>Recherche en cours</span>
            </div>
        </div>
    </div>
</template>

<script>

import CandidatBulle from "./Candidat/CandidatBulle.vue";

export default {

    name:"CandidatsPreviewBox",

    components:{
        CandidatBulle
    },

    props: ["users","candidats","totalCount","nbrNotNullCandidats","searching"],
}
</script>

<style scoped>

</style>