<script lang="ts" setup>
defineProps<{
    activePageIndex?: number
}>()

const goToPage = (page: string) => {
    navigateTo(page)
}

const showSidebar = ref(false)

const toggleSidebar = () => {
    showSidebar.value = !showSidebar.value
}
</script>
<template>
    <button id="sidebar-toggle" @click="toggleSidebar">
        <div v-if="!showSidebar" v-html="getIconSVG('menu')" class="menu-button">
        </div>
        <div v-else v-html="getIconSVG('collapse')" class="menu-button"></div>
    </button>
    <div id="sidebar" :class="{ open: showSidebar }">
        <div class="mobile-sidebar">
        <button :class="{ active: activePageIndex === 0 }" @click="goToPage('/mobileAbout')">About</button>
        <button :class="{ active: activePageIndex === 1 }" @click="goToPage('/mobileProjects')">Projects</button>
    </div>
    </div>

</template>
<style scoped>
.mobile-sidebar {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-top: 6rem;
    z-index: 200;
}

.mobile-sidebar button {
    width: 100%;
    padding: 1rem;
    border: none;
    border-radius: 8px;
    background: white;
    cursor: pointer;
    font-size: 1rem;
    text-align: left;
    transition: background 0.2s;
}

.mobile-sidebar button:hover {
    background: #e0e0e0;
}

.mobile-sidebar button.active {
    background: #3bd192;
    color: white;
    font-weight: bold;
}

#sidebar-toggle {
    position: fixed;
    top: max(env(safe-area-inset-top, 0px), 3rem);
    left: 1rem;
    z-index: 1000;
    background: white;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
}
#sidebar {
    position: fixed;
    left: -100%;
    top: 0;
    width: 80%;
    max-width: 300px;
    height: 100vh;
    background: whitesmoke;
    z-index: 999;
    transition: left 0.3s ease;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    padding: 1rem;
}

#sidebar.open {
    left: 0;
}
.menu-button {
    width: 2rem;
}

.menu-button:deep(svg) {
    width: 100%;
    height: 100%;
}
</style>
