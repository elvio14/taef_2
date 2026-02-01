<script lang="ts" setup>
defineProps<{
    isMobile?: boolean
}>()

const { data: resume } = await useAsyncData('resume', () => queryCollection('resume').first())
const {data: about} = await useAsyncData('about', () => queryCollection('about').first())

const socials = ["insta", "linkedin", "mygithub"]

const activePP = ref(0)

const copiedText = ref("")

const showTopFade = ref(false)
const showBottomFade = ref(false)

const copyEmail = async () => {
    const email = 'andrew.elvio14@gmail.com'
    try {
        if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(email)
        } else {
            const ta = document.createElement('textarea')
            ta.value = email
            ta.setAttribute('readonly', '')
            ta.style.position = 'absolute'
            ta.style.left = '-9999px'
            document.body.appendChild(ta)
            ta.select()
            document.execCommand('copy')
            document.body.removeChild(ta)
        }
        copiedText.value = "copied!"
    } catch (err) {
        console.error('Failed to copy email to clipboard', err)
    }

    setTimeout(()=> {
        copiedText.value = ""
    }, 2000)
}

const downloadResume = () => {
  window.open('https://drive.google.com/uc?export=download&id=17tgWn25OMfQxhtP5TG6BcAEV8Ag34Nvh', '_blank')
}

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
    <div id="about-root" :class="{ 'mobile-layout': isMobile }">
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
                    <div>
                        <UTooltip :text="`andrew.elvio14@gmail.com ${copiedText}`" >
                            <div id="about--icon-email" class="social-icon" 
                            v-html="getIconSVG('email')" aria-hidden="true"
                            @click="copyEmail"></div>
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
            <div id="download-resume">
                <UTooltip text="Download my resume" >
                    <div id="about--icon-download" class="social-icon" 
                    v-html="getIconSVG('download')" aria-hidden="true"
                    @click="downloadResume"></div>
                </UTooltip>
            </div>
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
        position: relative;
    }

    #about-root.mobile-layout {
        background-color: transparent;
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
        overflow-y: auto;
        height: 100vh;
        padding: 1rem;
        overflow-x: hidden;
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

    #about-root.mobile-layout #left {
        padding-top: 1rem;
        background: linear-gradient(to bottom, var(--about-on-bg) 0%, rgba(255, 255, 255, 0.562) 80%);
        overflow: visible;
        grid-template-rows: auto auto;
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
        text-align: center;
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
    #about-root.mobile-layout #textbox {
        padding: 1rem;
    }
    #profile-pic {
        width: 14rem;
        aspect-ratio: 1 / 1;
        background-color: azure;
        border-radius: 50%;
        overflow: hidden;
        position: relative;
        box-shadow: 0 6px 18px rgba(0,0,0,0.06);
    }

    #profile-pic img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        image-orientation: from-image;
        display: block;
    }

    #profile-pic::before {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 50%;
        pointer-events: none;
        background: radial-gradient(circle, rgba(255,255,255,0.06) 78%, rgba(255,255,255,0) 100%);
        mix-blend-mode: overlay;
    }

    #profile-pic::after {
        content: "";
        position: absolute;
        inset: 0;
        border-radius: 50%;
        pointer-events: none;
        background: radial-gradient(circle at center, rgba(0,0,0,0) 50%, rgba(0,0,0,0.36) 100%);
        box-shadow: inset 0 0 28px rgba(0,0,0,0.18);
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

    #download-resume {
        position: absolute;
        right: 1.25rem;
        bottom: 1.25rem;
        z-index: 10;
        background-color: rgb(255, 255, 255);
        border-radius: 50%;
        border: solid 2px transparent;
        width: 2rem;
        height: 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-left: 0.1rem;
    }

    #about-root.mobile-layout #download-resume {
        position: static;
        margin-bottom: 1rem;
        margin-left: auto;
    }

    #download-resume:hover {
        border-color: rgb(59, 209, 146);
    }
    #right {
        padding: 2rem;
        border-radius: 2rem;
        background: linear-gradient(to bottom, var(--about-on-bg) 0%, rgba(255, 255, 255, 0.616) 80%);
        overflow: scroll;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none; /* IE and Edge */
    }

    #about-root.mobile-layout #right {
        overflow: visible;
        border-radius: 2rem;
        padding: 1rem;
        padding-top: 2rem;
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
