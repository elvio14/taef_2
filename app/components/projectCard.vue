<script lang="ts" setup>
import { computed } from 'vue'
import Index from '~/pages/index.vue'

interface Project {
    id: string
    title: string
    images: string[]
    gif: string
    stack: string[]
    points: string[]
    github: string
    otherURL: string
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

const getGithubURL = (id: string) => {
    if(id.includes("/")){
        return `https://www.github.com/${id}`
    }else {
        return `https://www.github.com/elvio14/${id}`
    }
}
const openUrl = (url?: string) => {
    if (!url) return
    if (typeof window === 'undefined') return
    window.open(url, '_blank', 'noopener')
}

const getImages = () => {
    return props.project.images?.map((image) => {
        return `/${image}`
    }) ?? []
}

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
            <div className="flex flex-col gap-4">
                <p v-for="(point,index) in project.points" :key="`point-${project.id}-${index}`">{{ point }}</p>
            </div>
        </div>
        <div id="right">
            <div className="rounded-lg">
                <UCarousel
                  v-slot="{ item }"
                  loop
                  arrows
                  :dots="true"
                  :items="getImages()"
                  :ui="{
                    item: 'basis-1/1 ps-2',
                  }"
                >
                  <img :src="item" width="700" height="auto" className="rounded-lg">
                </UCarousel>
            </div>
        </div>
    </article>
</template>
<style lang="css" scoped>
    #left {
        background-color: white;
        border-top-left-radius: 1rem;
        border-bottom-left-radius: 1rem;
        padding: 2rem;
        padding-top: 4rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    #right {
        background-color: white;
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
    .icon {
        width: 2rem;
        cursor: pointer;
    }
</style>