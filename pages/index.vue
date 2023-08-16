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
        <div v-if="errorMessage">{{ errorMessage }}</div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import { micromark } from "micromark"


interface Release {
    id: number;
    name: string;
    published_at: string;
    body: string;
}

const releases = ref<Release[]>([])
const errorMessage = ref<string | null>(null)
if (process.client) {

    const {data, execute, pending, error, refresh} = await useLazyFetch(`https://api.github.com/repos/nuxt/nuxt/releases`, {
        onRequest({request, options}) {
            // Set the request headers
            options.headers = options.headers || {}
            options.headers.authorization = "..."
        },
        onRequestError({request, options, error}) {
            // Handle the request errors
        },
        onResponse({request, response, options}) {
            // Process the response data
            // localStorage.setItem('token', response._data.token)

        },
        onResponseError({request, response, options}) {
            // Handle the response errors
        }
    })

    watch(() => data.value, (value) => {
        if (value) {
            releases.value = value
        }
    })

    onMounted(async () => {
        await  execute()
    })

}
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
