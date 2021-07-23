<template>

    <div id="history-box">
        <div class="border-bottom p-3 pt-3 ps-4 pb-3 shadow-sm fw-bold d-flex justify-content-between align-items-center">
            <div>Historique</div>
            <div>
                <a v-on:click="$emit('close-history')" class="btn btn-sm btn-light border">Fermer</a>
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

</template>

<script>

export default {
    name:"HistoryBox",

    props:['history'],

}
</script>

<style scoped>
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
</style>