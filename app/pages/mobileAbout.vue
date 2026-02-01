<script lang="ts" setup>

</script>
<template>
    <div id="about-root">
        <div id="content">
            <AboutCard :isMobile="true"/>
        </div>
        <div id="navbar">
            <MobileNavBar :active-page="0"/>
        </div>
    </div>
</template>
<style scoped>
#about-root {
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