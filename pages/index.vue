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
                    <td>{{ release.body }}</td>
                </tr>
            </tbody>
        </table>
        <div v-if="error">{{ error }}</div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useFetch } from '@nuxtjs/composition-api';

interface Release {
    id: number;
    name: string;
    published_at: string;
    body: string;
}

const releases = ref<Release[]>([]);
const error = ref<string | null>(null);

const { fetch: getReleases } = useFetch(async () => {
    try {
        const response = await fetch('https://api.github.com/repos/nuxt/nuxt/releases');
        if (!response.ok) {
            throw new Error('Failed to fetch releases');
        }
        releases.value = await response.json();
    } catch (err: any) {
        error.value = err.message;
    }
});

getReleases();

</script>

<style scoped>
/* You can add styles specific to this page */
</style>
