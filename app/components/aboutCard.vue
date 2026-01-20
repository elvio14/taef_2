<script lang="ts" setup>
const { data: resume } = await useAsyncData('resume', () => queryCollection('resume').first())
const {data: about} = await useAsyncData('about', () => queryCollection('about').first())

const socials = ["insta", "linkedin", "mygithub"]

const activePP = ref(0)

const pp = [
    "self_1.webp",
    "self_2.webp",
    "self_3.webp",
    "self_4.webp",
    "self_5.webp",
    "self_6.webp",
    "self_7.webp"
]

// Cycle through profile pictures every second
onMounted(() => {
    const interval = setInterval(() => {
        activePP.value = (activePP.value + 1) % pp.length
    }, 2000)

    onUnmounted(() => {
        clearInterval(interval)
    })
})
</script>
<template>
    <div id="about-root">
        <div id="left">
            <div id="left-top">
                <!-- Profile Picture -->
                 <div id="profile-pic">
                    <img :src="pp[activePP]" />
                 </div>
                 <h2>Tjioe <u>Andrew</u> Elvio Febrian</h2>
                 <div id="socials">
                    <div v-for="s in socials" :key="`about-${s}`">
                        <UTooltip :text="getIconName(s)" >
                            <div :id="`about--icon-${s}`" class="social-icon" 
                            v-html="getIconSVG(s)" aria-hidden="true"
                            @click="openUrl(getIconLink(s))"></div>
                        </UTooltip>
                    </div>

                </div>
            </div>
            <div id="left-bottom">
                <div id="textbox" class="markdown">
                    <ContentRenderer v-if="about" :value="about" />
                </div>
            </div>
        </div>
        <div id="right" class="markdown">
            <ContentRenderer v-if="resume" :value="resume" />
        </div>
    </div>
</template>
<style scoped>
    #about-root {
        background-color: var(--about-bg);
        padding: 2rem;
        display: grid;
        grid-template-columns: 1fr 1.45fr;
        gap: 1rem;
    }

    #left {
        background: linear-gradient(to bottom, var(--about-on-bg) 0%, white 80%);
        border-radius: 2rem;
        display: grid;
        grid-template-rows: 1fr 1fr;
        overflow: scroll;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE and Edge */
    }

    #left::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
    }

    #left-top {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
        justify-content: center;
    }
    #left-bottom {
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: inherit;
    }
    #textbox {
        width: 100%;
        padding: 2rem;
    }
    #profile-pic {
        width: 14rem;
        aspect-ratio: 1 / 1;
        background-color: azure;
        border-radius: 50%;
        overflow: hidden;
    }

    #profile-pic img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        image-orientation: from-image;
        display: block;
    }

    #socials {
        display: flex;
        flex-direction: row;
        gap: 0.5rem;
    }
    .social-icon {
        width: 1.5rem;
        height: 1.5rem;
        display: inline-block;
        cursor: pointer;
    }

    .social-icon :deep(svg) {
        width: 100%;
        height: 100%;
        display: block;
    }

    #right {
        padding: 1rem;
        padding-right: 2rem;
        overflow: scroll;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE and Edge */
    }

    #right::-webkit-scrollbar {
        display: none; /* Chrome, Safari, Opera */
    }

    .markdown :deep(p) {
        margin-bottom: 1.5rem;
    }

    .markdown :deep(h1) {
        font-family: var(--heading-font);
        font-size: 2rem;
        margin-top: 2rem;
        margin-bottom: 1rem;
    }

    .markdown :deep(h2),
    .markdown :deep(h3) {
        font-family: var(--heading-font);
        font-size: x-large;
        margin-top: 2rem;
        margin-bottom: 1rem;
    }

    .markdown :deep(h1:first-child),
    .markdown :deep(h2:first-child),
    .markdown :deep(h3:first-child) {
        margin-top: 0;
    }

    .markdown :deep(ul) {
        list-style-type: disc;
        padding-left: 1.5rem;
        margin-bottom: 1.5rem;
    }

    .markdown :deep(li) {
        line-height: 1.6;
    }

    .markdown :deep(strong) {
        font-weight: 600;
    }

    .markdown :deep(em) {
        font-style: italic;
    }
</style>
