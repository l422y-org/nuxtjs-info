import { Ref } from "@vue/reactivity"

export default function useReleaseEnhancements(releasesEl: Ref<HTMLElement | null>) {
    releasesEl.value?.querySelectorAll("h2, h3").forEach((el: Element) => {
        const key = el.textContent?.toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "") || "unknown"
        el.classList.add(key)
    })
}
