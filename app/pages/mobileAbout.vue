<script lang="ts" setup>

</script>
<template>
    <div id="about-root">
        <MobileSideBar :active-page-index="0"/>
        <div id="content">
            <AboutCard :isMobile="true"/>
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
    padding-top: 8rem;
    position: relative;
}

#content {
    flex: 1;
    overflow: auto;
}

</style>