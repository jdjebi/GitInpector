<template>
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
</template>

<script>
export default {
    
    props: ['user']
}
</script>

