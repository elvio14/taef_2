<script lang="ts" setup>
const { data: projects } = await useAsyncData('projects', () => {
  return queryCollection('projects')
    .order('date', 'DESC')
    .all()
})

const activeProjectIndex = ref(1)

</script>
<template>
    <div id="project-root">
        <div id="content">
            <div v-for="(p, idx) in projects" :key="p.id">
                <MobileProjectCard :project="p" 
                :is-active="activeProjectIndex === idx" 
                @click="()=>activeProjectIndex = idx"/>
            </div>
        </div>
        <div id="navbar">
            <MobileNavBar :active-page="1"/>
        </div>
    </div>
</template>
<style scoped>
#project-root {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding-top: 5rem;
}

#content {
    flex: 1;
    overflow: auto;
}

#navbar {
    height: 4rem;
    flex-shrink: 0;
}
</style>