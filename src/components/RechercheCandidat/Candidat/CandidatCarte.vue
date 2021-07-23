<template>
    <div 
        @click="selectCandidat"
        v-bind:class="[selected ? 'border-success' : '' ]"
        class="candidat-box mb-3 p-4 m-3 rounded shadow-sm border"
    >
        <div class="d-flex align-items-center mb-2">
            <div class="me-3">
                <img v-bind:src="candidat.avatar_url" alt="" width="70" height="70" class="border rounded-circle">
            </div>
            <div>
                <div class="h4 mb-0"><a v-bind:href="candidat.html_url" target="_blank" class="text-dark" style="text-decoration:none">{{ candidat.login }}</a></div>
                <div><i class="fa fa-map-marker-alt text-success"></i>  {{ candidat.location ? candidat.location : "Aucune localisation" }} </div>
                <div class="small text-muted mb-2">
                    <a v-bind:href="candidat.blog" class="text-muted " target="_blank" style="text-decoration:none">{{ candidat.blog }}</a>
                </div>
            </div>
        </div>
        <div>
            <p class="small mb-2">
                {{ candidat.bio ? candidat.bio : "Aucune biographie." }}
            </p>
        </div>
        <div>
            <div class="d-flex justify-content-between flex-wrap">
                <div class="me-5">
                    <div class="fw-bold ">{{ candidat.followers }}</div>
                    <div class="text-success small">FOLLOWERS</div>
                </div>
                <div class="me-5">
                    <div class="fw-bold ">{{ candidat.following }}</div>
                    <div class="text-success small">FOLLOWING</div>
                </div>
                <div>
                    <div class="fw-bold ">{{ candidat.public_repos }}</div>
                    <div class="text-success small">REPOS</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {

    name:'CandidatCarte',

    props: ['candidat','selected'],

    data(){
        return {

        }
    },

    methods:{
        selectCandidat(){
            if(!this.selected){
                this.$emit('candidat-selected');
            }
        }
    }

}
</script>

<style scoped>
.candidat-box{
    cursor: pointer;
}

.candidat-box:hover{
    border: 1px solid #198754 !important;
}
</style>