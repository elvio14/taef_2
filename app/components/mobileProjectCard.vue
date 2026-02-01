<script lang="ts" setup>
import { marked } from 'marked'

interface Project {
    id: string
    title: string
    images: string[]
    stack: string[]
    points: string[]
    github: string
    md: string
    date: string | Date
}

const props = defineProps<{
  project: Project,
  isActive: boolean
}>()

const getImages = () => {
    return props.project.images?.map((image) => {
        return `/${image}`
    }) ?? []
}

const renderedMarkdown = computed(() => {
    if (!props.project?.md) return ''
    return marked(props.project.md)
})

</script>
<template>
    <div class="mobile-project-card">
        <div class="header">
            <div class="title-stack">
                {{project.title}}
                <div v-for="s in project.stack" :key="`mobile-stack${s}`" :id="`mobile-stack-icon-${s}`" class="mobile-stack-icon" 
                        v-html="getIconSVG(s)" aria-hidden="true"></div>
            </div>
            <div v-if="!isActive" v-html="getIconSVG('expand')" aria-hidden="true" class="expand-button"></div>
        </div>
        <div class="details" v-if="isActive">
            <div class="github" v-html="getIconSVG('github')" 
                style="padding-top: 0.4rem;" aria-hidden="true"
                @click="openUrl(getGithubURL(project.github))"></div>
            <div className="rounded-lg">
                <UCarousel
                    v-if="getImages().length > 1"
                    :key="`carousel-${project.id}`"
                    v-slot="{ item }"
                    :items="getImages()"
                    :ui="{
                      item: 'basis-full'
                    }"
                    :page="1"
                    arrows
                >
                  <NuxtImg 
                    v-if="!isGif(item)"
                    :key="`img-${item}`" 
                    :src="item" 
                    class="project-image rounded-lg"
                    loading="lazy"
                    format="webp"
                    quality="80"
                    width="700"
                    sizes="sm:100vw md:700px"
                    :preload="false"
                  />
                  <img
                    v-else
                    :key="`gif-${item}`"
                    :src="item"
                    class="project-image rounded-lg"
                    loading="lazy"
                    width="700"
                  />
                </UCarousel>
                <template v-else-if="getImages().length === 1">
                  <NuxtImg
                      v-if="!isGif(getImages()[0]!)"
                      :src="getImages()[0]"
                      width="700"
                      height="auto"
                      className="rounded-lg project-image"
                      loading="lazy"
                      format="webp"
                      quality="80"
                      sizes="sm:100vw md:700px"
                      :preload="false"
                  />
                  <img
                      v-else
                      :src="getImages()[0]"
                      width="700"
                      height="auto"
                      class="rounded-lg project-image"
                      loading="lazy"
                  />
                </template>
            </div>
            <div v-if="project.md" class="markdown-content" v-html="renderedMarkdown"></div>
            <div className="flex flex-col gap-4">
                <p v-for="(point,index) in project.points" :key="`point-${project.id}-${index}`">{{ point }}</p>
            </div>
        </div>
    </div>
</template>
<style scoped>
.mobile-project-card {
    background-color: var(--project-on-bg);
    margin: 1rem;
    padding: 1rem;
    border-radius: 2rem;
}

.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.title-stack {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.expand-button{
    width: 2rem;
    height: 2rem;
    display: flex;
}

.expand-button :deep(svg) {
    width: 100%;
    height: 100%;
}

.mobile-stack-icon {
    width: 1rem;
}

.details {
    padding-top: 1rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.github {
    width: 2rem;
}

.markdown-content :deep(h1) { font-size: 2rem; margin-bottom: 1rem; }
.markdown-content :deep(h2) { font-size: 1.5rem; margin-bottom: 0.75rem; }
.markdown-content :deep(p) { margin-bottom: 1rem; }
.markdown-content :deep(code) { background: #f4f4f4; padding: 0.2rem 0.4rem; border-radius: 3px; }
.markdown-content :deep(a) {
    color: var(--accent);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
    cursor: pointer;
}

.markdown-content :deep(a:hover) {
    text-decoration: underline;
}
</style>