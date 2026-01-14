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
const activeProjectIndex = useState('activeProjectIndex', () => 1)
const hoveredProjectNavIndex = useState('hoveredProjectNavIndex', () => -1)

const { data: projects } = await useAsyncData('projects', () => {
  return queryCollection('projects')
    .order('date', 'DESC')
    .all()
})

const currentProject = computed(() => {
  const list = projects?.value
  const idx = activeProjectIndex.value ?? 1
  return Array.isArray(list) && list.length > 0 ? list[idx] : null
})

</script>
<template>
    <div id="root-div">

        <nav class="card-nav">
            <NavButton name="About" color="var(--about-bg)" :isActive="activeCard === Card.About" @click="activeCard = Card.About"/>
            <NavButton name="Projects" color="var(--project-bg)" :isActive="activeCard === Card.Projects" @click="activeCard = Card.Projects"/>
        </nav>


        <div id="card" class="has-texture">
            <AboutCard class="card-child" v-if="activeCard == Card.About"/>

            <div id="project-card" class="card-child has-texture" v-if="activeCard === Card.Projects">
                <nav class="project-nav">
                    <div v-for="(p, idx) in projects" :key="p.id ?? idx" class="nav-item-wrapper">
                        <button
                            @mouseenter="hoveredProjectNavIndex = idx"
                            @mouseleave="hoveredProjectNavIndex = -1"
                            @click="activeProjectIndex = idx"
                            :class="{ active: activeProjectIndex === idx }"
                        >
                            {{ p.title }}
                        </button>
                        <div v-if="hoveredProjectNavIndex === idx" class="hover-stack" id="`nav-stack-${idx}`">
                            <div v-for="s in p.stack" :key="`nav-stack${s}`" :id="`nav-stack-icon-${idx}-${s}`" class="hover-stack-icon" 
                                v-html="getIconSVG(s)" aria-hidden="true"></div>
                        </div>
                    </div>
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
        align-items: start;
        gap: 0.3rem;
    }

    .nav-item-wrapper {
        position: relative;
    }

    .project-nav button {
        background-color: transparent;
        font-size: large;
        width: 100%;
        text-align: start;
        height: 3rem;
        padding-left: 1rem;
        padding-right: 1rem;
        border-top-right-radius: 0.6rem;
        border-bottom-right-radius: 0.6rem;
        border: none;
        /* overflow: hidden; */
        cursor: pointer;
    }
    .project-nav button:not(.active):hover {
        background-color: white;
    }
    .project-nav button.active {
        background-color: var(--project-on-bg);
    }

    .hover-stack {
        position: absolute;
        right: 100%;  /* float to the left of the button */
        top: 0;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        height: 3rem;
        padding-left: 1rem;
        padding-right: 1rem;
        background: linear-gradient(to right, var(--project-on-bg) 85%, transparent 100%);
        border-top-left-radius: 0.6rem;
        border-bottom-left-radius: 0.6rem;
        white-space: nowrap;
        z-index: 100;
        pointer-events: none; /* so it doesn't interfere with mouse events */
    }

    .hover-stack-icon {
        width: 1rem;
    }
</style>