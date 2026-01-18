<script lang="ts" setup>
    const props = defineProps<{
      name: string
      isActive: boolean
      color: string
    }>()

    const name = computed(() => props.name ?? 'Button')
    const isActive = computed(() => props.isActive ?? false)
    const height = ref(40)

    const totalWidth = computed(() => {
        const len = name.value.length
        const width = 40 + len*24
        return width
    })

</script>
<template>
    <div :class="{'is-active': isActive}" class="nav-button-root">
        <svg version="1.1" :width="totalWidth" :height="height" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <defs>
                <!-- Texture pattern -->
                <pattern :id="`${name}-texture`" patternUnits="userSpaceOnUse" width="200" height="200">
                    <image href="/textures/fresh-snow.png" width="200" height="200" />
                </pattern>
                
                <mask :id="`${name}-left-bottom`" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
                    <rect width="20" height="100%" fill="white"/>
                    <circle cx="0" cy="20" r="20" fill="black"/>
                    <rect width="20" height="50%" fill="black"/>
                </mask>

                <mask :id="`${name}-left-top`" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
                    <circle cx="40" cy="20" r="20" fill="white"/>
                    <rect x="20" y="50%" width="20" height="50%" fill="white"/>
                </mask>

                <mask :id="`${name}-right-bottom`" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
                    <rect :x="totalWidth-20" width="20" height="100%" fill="white"/>
                    <circle :cx="totalWidth" cy="20" r="20" fill="black"/>
                    <rect :x="totalWidth-20" width="20" height="50%" fill="black"/>
                </mask>

                <mask :id="`${name}-right-top`" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse">
                    <circle :cx="totalWidth-40" cy="20" r="20" fill="white"/>
                    <rect :x="totalWidth-40" y="50%" width="20" height="50%" fill="white"/>
                </mask>
            </defs>
            <g :fill="color">
                <rect width="20" height="100%" :mask="`url(#${name}-left-bottom)`"/>
                <rect x="20" width="20" height="100%" :mask="`url(#${name}-left-top)`"/>
                <rect x="40" :width="totalWidth-80" height="100%"/>
                <rect :x="totalWidth-20" width="20" height="100%" :mask="`url(#${name}-right-bottom)`"/>
                <rect :x="totalWidth - 40" width="20" height="100%" :mask="`url(#${name}-right-top)`"/>
            </g>
            <!-- Texture overlay with multiply blend mode -->
            <g style="mix-blend-mode: multiply; opacity: 0.3;">
                <rect width="20" height="100%" :mask="`url(#${name}-left-bottom)`" :fill="`url(#${name}-texture)`"/>
                <rect x="20" width="20" height="100%" :mask="`url(#${name}-left-top)`" :fill="`url(#${name}-texture)`"/>
                <rect x="40" :width="totalWidth-80" height="100%" :fill="`url(#${name}-texture)`"/>
                <rect :x="totalWidth-20" width="20" height="100%" :mask="`url(#${name}-right-bottom)`" :fill="`url(#${name}-texture)`"/>
                <rect :x="totalWidth - 40" width="20" height="100%" :mask="`url(#${name}-right-top)`" :fill="`url(#${name}-texture)`"/>
            </g>
            <text class="nav-text" :x="totalWidth/2" y="70%" text-anchor="middle" font-family="HeadFont">{{ name }}</text>
        </svg>
    </div>
</template>
<style scoped>
    .nav-button-root:not(.is-active):hover .nav-text {
        fill: white;
        cursor: pointer;
    }
</style>