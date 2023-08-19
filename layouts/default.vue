<template>
    <div>
        <NuxtPage/>
    </div>
</template>
<style lang="scss">
body {
  font-family: "Roboto", sans-serif;
}
</style>
<script lang="ts" setup>
useHead({
    title: "NuxtJS Releases Overview",
    meta: [
        {
            key: "description",
            name: "description",
            content: "NuxtJS Releases Overview"
        }
    ],
    link: [
        {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
        }
    ]
})
</script>
