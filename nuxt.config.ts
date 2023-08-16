// https://nuxt.com/docs/api/configuration/nuxt-config


import path from "path"
import * as fs from "fs"

export default defineNuxtConfig({
    devtools: {enabled: true},
    hooks: {
        "build:before": async () => {
            try {
                const response = await fetch("https://api.github.com/repos/nuxt/nuxt/releases")
                if (!response.ok) {
                    throw new Error("Failed to fetch releases")
                }
                const data = await response.json()
                const outputPath = path.resolve(__dirname, "static/releases.json")
                fs.writeFileSync(outputPath, JSON.stringify(data, null, 2))
                console.log("Fetched and saved release data!")
            } catch (error) {
                console.error("Error fetching releases:", error)
            }
        }
    }

})
