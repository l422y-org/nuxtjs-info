<template>
    <div>
        <h1>GitHub Releases for nuxt/nuxt</h1>
        <table v-if="releases && releases.length">
            <thead>
                <tr>
                    <th>Release Name</th>
                    <th>Published At</th>
                    <th>Changes</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="release in releases" :key="release.id">
                    <td>{{ release.name }}</td>
                    <td>{{ release.published_at }}</td>
                    <td class="body">
                        <div v-html="micromark(release.body,'utf-8')"></div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { micromark } from "micromark"
import releasesData from "~/static/releases.json"


interface Release {
    id: number;
    name: string;
    published_at: string;
    body: string;
}

const releases: Ref<Release[]> = ref(releasesData)

</script>

<style scoped>
tr td {
    padding-bottom: 2rem;
}

.body {
    white-space: pre-wrap;
    max-width: 640px;
}
</style>
