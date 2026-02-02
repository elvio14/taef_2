<script lang="ts" setup>
import { computed, render } from 'vue'
import { marked } from 'marked'
import Index from '~/pages/index.vue'

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
  project: Project
}>()

const formattedDate = computed(() => {
    if (!props.project?.date) return ''
    const d = new Date(props.project.date)
    return d.toLocaleDateString()
})

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
    <article class="project-card">
        <div id="left">
            <div style="display: flex; flex-direction: row; align-items: center; gap: 1rem;">
                <UTooltip text="GitHub repo">
                    <div class="icon" v-html="getIconSVG('github')" 
                        style="padding-top: 0.4rem;" aria-hidden="true"
                        @click="openUrl(getGithubURL(project.github))"></div>
                </UTooltip>
                <h2 className="text-2xl">{{ project.title }}</h2>
                
            </div>
            <div className="flex flex-col gap-2">
                <p>Stack:</p>
                <div style="display: flex; flex-direction: row; gap: 1.4rem">
                    <div v-for="s in project.stack" :key="s">
                        <UTooltip :text="getIconName(s)" >
                            <div  :id="`stack-icon-${project.id}-${s}`" class="icon stack" 
                                v-html="getIconSVG(s)" aria-hidden="true"
                                @click="openUrl(getIconLink(s))"></div>
                        </UTooltip>
                    </div>
                </div>
            </div>
            <div v-if="project.md" class="markdown-content" v-html="renderedMarkdown"></div>
            <div class="points-container flex flex-col gap-4">
                <p v-for="(point,index) in project.points" :key="`point-${project.id}-${index}`">{{ point }}</p>
            </div>
        </div>
        <div id="right">
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
        </div>
    </article>
</template>
<style lang="css">
    #left {
        background-color:var(--project-on-bg);
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 1rem;
        padding: 2rem;
        padding-top: 4rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        overflow-y: hidden;
    }

    #right {
        background-color:var(--project-on-bg);
        border-top-right-radius: 1rem;
        border-bottom-right-radius: 1rem;
        padding-top: 4rem;
        padding-right: 2rem;
        overflow: visible;
    }
    .project-card {
        display: grid;
        grid-template-columns: 1fr 2fr;
        padding: 2rem;
        padding-left: 0rem;
    }

    .project-image {
        object-fit: contain;
        margin: 0 auto;
        display: block;
    }

    #right :deep(.carousel) {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .icon {
        width: 2rem;
        cursor: pointer;
    }

    .points-container {
        overflow-y: auto;
        flex: 1;
        min-height: 0;
        max-height: 20rem;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE and Edge */
    }

    .points-container::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
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