<template>
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
                <tr v-for="(candidat, index) in candidats" v-bind:key="candidat">
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
</template>

<script>

export default {

    name:"TableFollowing",

    props: ["candidats"],
}
</script>

<style scoped>

</style>