<script lang="ts" setup>
import { computed } from 'vue'

interface Project {
    id: string
    title: string
    images: string[]
    gif: string
    stack: string[]
    points: string[]
    urls: {
      isGithub: boolean
      url: string
    }
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
</script>
<template>
    <article class="project-card">
        <h2>{{ project.title }}</h2>
    </article>
</template>
<style lang="css" scoped>
    .project-card {
        border: 1px red;
        width: 80vw;
        height: 70vh;
    }
</style>