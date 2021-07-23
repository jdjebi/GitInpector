<template>
    <div class="candidat-bubble shadow-sm" v-bind:title="candidat.login">
        <div class="avatar">
            <img v-bind:src="candidat.avatar_url" class="rounded-circle" width="30">
        </div>
        <div class="label">
            {{ candidat.login }}
        </div>
    </div>
</template>

<script>

export default {

    name:'CandidatBulle',

    props: ['candidat'],

}
</script>

<style scoped>
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