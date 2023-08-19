<template>
    <div>
        <h1>GitHub Releases for nuxt/nuxt</h1>
        <div v-if="releases && releases.length" class="releases">
            <header>
                <div>Release / Published At</div>
                <div>Changes</div>
            </header>
            <div v-for="release in releases" :key="release.id" class="release">
                <div class="release__col1">
                    <span class="release__name">{{ release.name }}</span>
                    <small class="release__date">{{ release.published_at }}</small>
                </div>

                <div class="release__body">
                    <div v-html="micromark(release.body,'utf-8')"></div>
                </div>
            </div>
        </div>
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

<style lang="scss">

.releases {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0;

  > * {
    display: grid;
    width: 100%;
    max-width: 640px;
    grid-template-columns: 6rem 1fr;
    gap: 1rem;

  }

}

.release {
  border: 1px solid black;

  &__name {
    font-weight: bold;
    display: block;
  }

  &__body {
    padding: 1rem;

    blockquote {
      position: relative;
      display: block;
      margin-left: 0;
      padding: 0.5rem 0.5rem 0.5rem 1rem;
      text-align: center;
      border-radius: .2rem;
      background-color: #eee;

      &:before {
        position: absolute;
        top: .5rem;
        bottom: .5rem;
        left: .5rem;
        width: .25rem;
        content: "";
        background-color: gold;
      }
    }

    p {
      margin: 0;
      padding: 0;
    }

    h2, h3 {
      padding: 0;
      margin-inline-end: 0;
    }
  }

  &__col1 {
    display: flex;
    flex-direction: column;
    padding: .5rem;
  }

  &__date {
    font-size: 0.8rem;
    display: block;
  }


}
</style>
