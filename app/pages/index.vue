<script lang="ts" setup>

const isMobile = useState<boolean>('isMobile', () => false)

const updateIsMobile = () => {
    isMobile.value = typeof window !== 'undefined' ? window.innerWidth < 850 : false
}

onMounted(() => {
    updateIsMobile()
    if (typeof window !== 'undefined') {
        window.addEventListener('resize', updateIsMobile)
    }
})

onUnmounted(() => {
    if (typeof window !== 'undefined') {
        window.removeEventListener('resize', updateIsMobile)
    }
})

enum Card {
    About = 'about',
    Projects = 'projects',
    Links = 'links'
}

const activeCard = useState<Card>('activeCard', () => Card.Projects)
const activeProjectIndex = useState('activeProjectIndex', () => 0)

const { data: projects } = await useAsyncData('projects', () => {
  return queryCollection('projects')
    .order('date', 'DESC')
    .all()
})

const currentProject = computed(() => {
  const list = projects?.value
  const idx = activeProjectIndex.value ?? 0
  return Array.isArray(list) && list.length > 0 ? list[idx] : null
})

</script>
<template>
    <div id="root-div">
        <div>
            <nav class="card-nav">
                <button
                    :class="{ active: activeCard === Card.About}"
                    @click="activeCard = Card.About">About</button>
                <button
                    :class="{ active: activeCard === Card.Projects}"
                    @click="activeCard = Card.Projects">Projects</button>
                <button
                    :class="{ active: activeCard === Card.Links}"
                    @click="activeCard = Card.Links">Links</button>
            </nav>
        </div>  

        <AboutCard v-if="activeCard == Card.About"/>

        <div v-if="activeCard === Card.Projects" style="display: flex;">
            <nav class="project-nav">
                <button v-for="p in projects">
                    {{ p.title }}
                </button>
            </nav>
            <ProjectCard v-if="currentProject" :project="currentProject"/>
        </div>
    </div>
</template>
<style scoped>
    #root-div {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: solid 2px red;
        background-color: aqua;
    }
    .card-nav {
        display: flex;
        flex-direction: row;
        gap: 1rem; 
    }

    .project-nav {
        padding-top: 2rem;
        padding-right: 1rem;
        width: 10vw;
        display: flex;
        flex-direction: column;
        align-items: end;
        gap: 2rem;
    }

    .project-nav button {

    }
</style>