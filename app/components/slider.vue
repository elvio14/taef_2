<script lang="ts" setup>
const model = defineModel<number>({ default: 0 })
const props = defineProps<{
    min?: number
    max?: number
}>()

const min = computed(() => props.min ?? 0)
const max = computed(() => props.max ?? 100)

const trackRef = ref<HTMLElement | null>(null)
const isDragging = ref(false)

// convert mouse position to value
const updateValue = (clientX: number) => {
    if (!trackRef.value) return
    
    const rect = trackRef.value.getBoundingClientRect()
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    const value = min.value + percent * (max.value - min.value)
    model.value = Math.round(value)
}

// percentage for thumb position
const thumbPercent = computed(() => {
    return ((model.value - min.value) / (max.value - min.value)) * 100
})

// sprite animation based on thumb position
const spriteFrame = computed(() => {
    const frame = Math.floor((thumbPercent.value / 100) * 9) // 0-9 frames
    return frame * 40 // offset in pixels
})

// mouse events
const onMouseDown = (e: MouseEvent) => {
    isDragging.value = true
    updateValue(e.clientX)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
}

const onMouseMove = (e: MouseEvent) => {
    if (!isDragging.value) return
    updateValue(e.clientX)
}

const onMouseUp = () => {
    isDragging.value = false
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
}


// cleanup on unmount
onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
})
</script>

<template>
    <div class="slider-container">
        <div 
            ref="trackRef"
            class="slider-track"
            @mousedown="onMouseDown"
        >
            <div 
                class="slider-thumb slider-icon"
                :class="{ dragging: isDragging }"
                :style="{ left: `${thumbPercent}%` }"
            >
                <img 
                    src="/SunMoon.png" 
                    alt="sunmoon icon"
                    :style="{ objectPosition: `-${spriteFrame}px 0` , cursor: 'pointer'}"
                >
            </div>
        </div>
    </div>
</template>

<style scoped>
.slider-container {
    padding: 0 30px; /* Extra padding to prevent cropping at edges */
    overflow: visible;
}

.slider-track {
    position: relative;
    width: 100%;
    height: 8px;
    background: rgba(0,0,0,0.2);
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
    touch-action: none; /* prevents scroll on touch drag */
}

.slider-icon {
    position: absolute;
    top: -30px; /* Position above the track */
    transform: translateX(-50%);
    pointer-events: auto;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
}

.slider-icon img {
    width: 40px;
    height: 40px;
    display: block;
    object-fit: none;
    object-position: 0 0;
    pointer-events: none;
}

.slider-thumb {
    position: absolute;
    top: 50%;
    width: 50px;
    height: 50px;
    background: transparent;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    transition: transform 0.1s ease;
    cursor:pointer;
    pointer-events: auto;
}

.slider-thumb.dragging {
    transform: translate(-50%, -50%) scale(1.2);
}
</style>