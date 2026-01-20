<script lang="ts" setup>

const time = ref(0)  //0-100 := Morning, Night

// SUN =============================================================
const showSun = ref(true)
const sunInnerLigStart = 100
const sunMiddleHueStart = 55
const sunMiddleHueOffset = 50
const sunMiddleSatStart = 70
const sunMiddleSatOffset = 20
const sunOuterLigStart = 100
const sunOuterLigOffset = 20
const sunXStart = 50
const sunXOffset = 40
const sunYStart = 65
const sunYOffset = 55

const sunX = ref();
const sunY = ref()
const sunInnerHue = ref(20)
const sunInnerSat = ref(100)
const sunInnerLig = ref()
const sunInnerAlp = ref(1)
const sunMiddleHue = ref()
const sunMiddleSat = ref()
const sunMiddleLig = ref(80)
const sunMiddleAlp = ref(1)
const sunOuterHue = ref(0)
const sunOuterSat = ref(100)
const sunOuterLig = ref()
const sunOuterAlp = ref(0)
const sunInnerStart = ref(0)
const sunMiddleStart = ref(5)
const sunOuterStart = ref(70)

// MOON ============================================================
const moonInnerSatStart = 40
const moonInnerSatOffset = 30
const moonInnerLigStart = 60
const moonInnerLigOffset = 20
const moonMiddleHueStart = 55
const moonMiddleHueOffset = 50
const moonMiddleSatStart = 20
const moonMiddleSatOffset = 60
const moonMiddleLigStart = 50
const moonMiddleLigOffset = 30
const moonMiddleAlpStart = 0.3
const moonMiddleAlpOffset = 0.7
const moonOuterLigStart = 50
const moonOuterLigOffset = 20
const moonXStart = 50
const moonXOffset = 40
const moonYStart = 65
const moonYOffset = 55

const moonX = ref(moonXStart);
const moonY = ref(moonYStart)
const moonInnerHue = ref(55)
const moonInnerSat = ref(moonInnerSatStart)
const moonInnerLig = ref(moonInnerLigStart)
const moonInnerAlp = ref(1)
const moonMiddleHue = ref(moonMiddleHueStart)
const moonMiddleSat = ref(moonMiddleSatStart)
const moonMiddleLig = ref(80)
const moonMiddleAlp = ref(moonMiddleAlpStart)
const moonOuterHue = ref(0)
const moonOuterSat = ref(100)
const moonOuterLig = ref(moonOuterLigStart)
const moonOuterAlp = ref(0)
const moonInnerStart = ref(0)
const moonMiddleStart = ref(5)
const moonOuterStart = ref(70)

// SKY =============================================================
const skyTopHueStart = 185
const skyTopSatStart = 80
const skyTopLigStart = 85
const skyTopHueMiddle = 280
const skyTopSatMiddle = 35
const skyTopLigMiddle = 40

const skyTopHue = ref(skyTopHueStart)
const skyTopSat = ref(skyTopSatStart)
const skyTopLig = ref(skyTopLigStart)
const skyTopAlp = ref(0.8)

const skyHorizonHueStart = 185
const skyHorizonHueDayOffset = 80
const skyHorizonSatStart = 50
const skyHorizonSatOffset = 50
const skyHorizonLigStart = 50
const skyHorizonHue = ref(skyHorizonHueStart)
const skyHorizonSat = ref(skyHorizonSatStart)
const skyHorizonLig = ref(skyHorizonLigStart)
const skyHorizonAlp = ref()

const skyBottomHueMiddle = 134
const skyBottomHueDayOffset = 80
const skyBottomSatMiddle = 20
const skyBottomSatOffset = 50
const skyBottomLigMiddle = 20
const skyBottomHue = ref(skyBottomHueMiddle)
const skyBottomSat = ref(skyBottomSatMiddle)
const skyBottomLig = ref(skyBottomLigMiddle)
const skyBottomAlp = ref(1)


// =================================================================
watch(time, (newTime) => {
    
    if(newTime < 50) {
        // DAYTIME
        showSun.value = true

        const daySin = Math.sin((newTime / 100) * Math.PI)
        const dayCos = Math.cos((newTime / 100) * Math.PI)
        
        sunX.value = sunXStart + (newTime/50 * sunXOffset)
        sunY.value = sunYStart - sunYOffset * dayCos
        sunMiddleStart.value = 15 - 10 * daySin
        sunOuterStart.value = 100 - 30 * daySin
        sunInnerLig.value = sunInnerLigStart - 10 * daySin
        sunMiddleHue.value = sunMiddleHueStart - sunMiddleHueOffset * daySin
        sunMiddleSat.value = sunMiddleSatStart  + sunMiddleSatOffset * daySin
        sunOuterLig.value = sunOuterLigStart - sunOuterLigOffset * daySin
        sunOuterAlp.value = 0.5*daySin

        skyHorizonHue.value = skyHorizonHueStart + skyHorizonHueDayOffset * daySin
        //const halfDaySin = Math.sin((newTime / 50) * Math.PI)
        skyHorizonSat.value = skyHorizonSatStart - skyHorizonSatOffset * daySin
        skyHorizonAlp.value = 0.6 - 0.3*daySin
        
        skyTopHue.value = skyTopHueStart + 50 * daySin
        skyTopSat.value = skyTopSatStart - 30 * daySin
        skyTopLig.value = skyTopLigStart - 30 * daySin

    }else {
        showSun.value = false
        // NIGHT TIME
        const nightSin = Math.sin(((newTime-50) / 100) * Math.PI)
        const nightCos = Math.cos(((newTime-50) / 100) * Math.PI)        
    
        moonX.value = moonXStart - moonXOffset * nightCos
        moonY.value = moonYStart - moonYOffset * nightSin
        moonInnerSat.value = moonInnerSatStart + moonInnerSatOffset * nightSin
        moonInnerLig.value = moonInnerLigStart + moonInnerLigOffset * nightSin
        moonMiddleSat.value = moonMiddleSatStart + moonMiddleSatOffset * nightSin
        moonMiddleAlp.value = moonMiddleAlpStart + moonMiddleAlpOffset * nightSin

        skyTopHue.value = skyTopHueMiddle + 50 * nightSin
        skyTopSat.value = skyTopSatMiddle - 30 * nightSin
        skyTopLig.value = skyTopLigMiddle - 30 * nightSin

        skyBottomAlp.value = nightCos
    }
}, { immediate: true })

const skyGradient = computed(()=> {
    return `linear-gradient(
            hsla(${skyTopHue.value},${skyTopSat.value}%,${skyTopLig.value}%, ${skyTopAlp.value}) 0%, 
            hsla(${skyHorizonHue.value},${skyHorizonSat.value}%,${skyHorizonLig.value}%, ${skyHorizonAlp.value}) 65%,
            #1622127a 80%,
            hsla(${skyBottomHue.value},${skyBottomSat.value}%,${skyBottomLig.value}%, ${skyBottomAlp.value})
        )`
})

const sunGradient = computed(() => {
    return `radial-gradient(
        circle at ${sunX.value}% ${sunY.value}%,
        hsla(${sunInnerHue.value},${sunInnerSat.value}%,${sunInnerLig.value}%,${sunInnerAlp.value}) ${sunInnerStart.value}%,
        hsla(${sunMiddleHue.value},${sunMiddleSat.value}%,${sunMiddleLig.value}%,${sunMiddleAlp.value}) ${sunMiddleStart.value}%,
        hsla(${sunOuterHue.value},${sunOuterSat.value}%,${sunOuterLig.value}%,${sunOuterAlp.value}) ${sunOuterStart.value}%)`
})

const moonGradient = computed(() => {
    return `radial-gradient(
        circle at ${moonX.value}% ${moonY.value}%,
        hsla(${moonInnerHue.value},${moonInnerSat.value}%,${moonInnerLig.value}%,${moonInnerAlp.value}) ${moonInnerStart.value}%,
        hsla(${moonMiddleHue.value},${moonMiddleSat.value}%,${moonMiddleLig.value}%,${moonMiddleAlp.value}) ${moonMiddleStart.value}%,
        hsla(${moonOuterHue.value},${moonOuterSat.value}%,${moonOuterLig.value}%,${moonOuterAlp.value}) ${moonOuterStart.value}%)`
})

const starPattern = computed(() => {
    return `linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(0,0,0,1) 100%), url(/textures/stardust.png)`
})

const backgroundStyle = computed(() => {
    const layers = [skyGradient.value]
    if (showSun.value) {
        layers.push(sunGradient.value)
    } else {
        layers.push(starPattern.value)
        layers.push(moonGradient.value)
    }
    return { background: layers.join(', ') }
})

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
</script>
<template>
    <div id="layout-root" :style="backgroundStyle">
        <div id="slider-container" :class="{ mobile: isMobile }">
            <Slider v-model="time"/>
        </div>
        <slot></slot> 
    </div>
</template>
<style scoped>
    #layout-root {
        width: 100%;
        height: 100%;
        width: 100vw;
        height: 100vh;
        position: relative;
    }

    #slider-container {
        position: fixed;
        top: 2rem;
        right: 4rem;
        transform: translateX(-50%);
        width: 300px;
        z-index: 1000;
        padding: 1rem;
        border-radius: 0.5rem;
    }

    #slider-container.mobile {
        left: 50%;
        right: auto;
    }
</style>