<script lang="ts" setup>
    defineProps<{
        activePage?: number
    }>()

const goToPage = (page: string) => {
    navigateTo(page)
}
</script>
<template>
    <div class="mobile-nav-bar">
        <button :class="{ active: activePage === 0 }" @click="goToPage('/')">About</button>
        <button :class="{ active: activePage === 1 }" @click="goToPage('/mobileProjects')">Projects</button>
    </div>
</template>

<style scoped>
.mobile-nav-bar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 1rem;
    background: #ffffff44;
    box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
}

.mobile-nav-bar button {
    flex: 1;
    padding: 0.75rem 1rem;
    margin: 0 0.5rem;
    border: none;
    border-radius: 8px;
    background: #ffffff44;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.2s;
}

.mobile-nav-bar button:hover {
    background: #e0e0e0;
}

.mobile-nav-bar button.active {
    background: #ffffff;
    font-weight: bold;
}
</style>