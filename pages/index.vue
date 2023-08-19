<template>
    <div>
        <h1>NuxtJS Updates</h1>
        <div v-if="releases && releases.length" ref="releasesEl" class="releases">
            <header>
                <div>Release / Published At</div>
                <div>Changes</div>
            </header>
            <div v-for="release in releases" :key="release.id" class="release">
                <div class="release__col1">
                    <span class="release__name"><a :href="`https://github.com/nuxt/nuxt/releases/${release.name}`">{{
                            release.name
                        }}</a></span>
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
const releasesEl = ref<HTMLElement | null>(null)

onMounted(() => {
    useReleaseEnhancements(releasesEl)
})

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

  h2.changelog,
  h2.fixes {
    //display: revert;
    //
    //~ {
    //  p, pre, ul {
    //
    //    display: revert;
    //
    //  }
    //}
  }

  h2.upgrading,
  h3.contributors {
    //display: none;
    //
    //~ {
    //  p, pre, ul {
    //    display: none;
    //  }
    //}
  }

  h2.upgrading,
  h2.upgrading + p,
  h2.upgrading + p + pre,
  h2.upgrading + p + pre + p {
    display: none;
  }


  h3.contributors,
  h3.contributors + ul,
  h3.contributors + p + pre,
  h3.contributors + p + pre + p {
    display: none;
  }


}
</style>
