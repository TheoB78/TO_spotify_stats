<template>
    <img :src="image" slot="start" class="trackImage"/>
    <ion-label>
        <strong>{{ name }}</strong><br>
        <ion-text>{{ artists }}</ion-text><br>
        <ion-note >{{ album }}</ion-note>
    </ion-label>
</template>

<script setup lang="ts">

defineProps({
    name: String,
    album: String,
    artists: String,
    image: String,
})

</script>

<style scoped>
.trackImage {
    width: 64px;
}

</style>