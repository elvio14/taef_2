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

        <nav class="card-nav">
            <NavButton name="About" color="var(--about-bg)" :isActive="activeCard === Card.About" @click="activeCard = Card.About"/>
            <NavButton name="Projects" color="var(--project-bg)" :isActive="activeCard === Card.Projects" @click="activeCard = Card.Projects"/>
            <NavButton name="Links" color="lightseagreen" :isActive="activeCard === Card.Links" @click="activeCard = Card.Links"/>
        </nav>


        <div id="card" class="has-texture">
            <AboutCard class="card-child" v-if="activeCard == Card.About"/>

            <div id="project-card" class="card-child has-texture" v-if="activeCard === Card.Projects">
                <nav class="project-nav">
                    <button
                        v-for="(p, idx) in projects"
                        :key="p.id ?? idx"
                        @click="activeProjectIndex = idx"
                        :class="{ active: activeProjectIndex === idx }"
                    >
                        {{ p.title }}
                    </button>
                </nav>
                <ProjectCard v-if="currentProject" :project="currentProject"/>
            </div>
        </div>

    </div>
</template>
<style scoped>
    #root-div {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .card-nav {
        display: flex;
        flex-direction: row;
        gap: 0rem; 
        height: 2.5rem;
        padding-left: 1rem;
    }

    #card {
        width: 80vw;
        height: 85vh;
        border-radius: 1rem;
    }

    .card-child{
        width: 100%;
        height: 100%;
        border-radius: inherit;
    }

    #project-card {
        display: grid;
        grid-template-columns: 1fr 5fr;
        align-items: stretch;
        min-height: 0;
        background-color: var(--project-bg);
    }

    .project-nav {
        padding-top: 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;
    }

    .project-nav button {
        background-color: transparent;
        font-size: large;
        width: 85%;
        text-align: start;
        padding: 1rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
        border-radius: 0.7rem;
        border: none;
        overflow: hidden;
        cursor: pointer;
    }
    .project-nav button:hover {
        background-color: rgb(223, 232, 243);
    }
    .project-nav button.active {
        background-color:lightsteelblue;
    }
</style>