import { ref, onMounted, onUnmounted, nextTick, computed, watch } from 'vue'

export default function(elRef: { value: HTMLElement | null }) {
    const rect = ref<DOMRect | null>(null)

    const update = () => {
        const el = elRef.value
        if (!el) {
            rect.value = null
            return
        }
        rect.value = el.getBoundingClientRect()
    }

    // viewport-relative coords (same as getBoundingClientRect)
    const viewport = computed(() => rect.value)

    // document/page absolute coords
    const absolute = computed(() => {
        if (!rect.value) return null
        return {
            top: rect.value.top + window.scrollY,
            left: rect.value.left + window.scrollX,
            bottom: rect.value.bottom + window.scrollY,
            right: rect.value.right + window.scrollX,
            width: rect.value.width,
            height: rect.value.height
        }
    })

    onMounted(async () => {
        await nextTick()
        update()
    })

    // keep in sync on resize/scroll and when the element ref changes
    const onWin = () => update()
    window.addEventListener('resize', onWin)
    window.addEventListener('scroll', onWin, { passive: true })

    // observe size changes of the element
    const ro = typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(update)
        : null

    watch(
      () => elRef.value,
      (el, _, onCleanup) => {
        if (ro && el) ro.observe(el)
        onCleanup(() => {
          if (ro && el) ro.unobserve(el)
        })
        update()
      },
      { immediate: true }
    )

    onUnmounted(() => {
        window.removeEventListener('resize', onWin)
        window.removeEventListener('scroll', onWin)
        ro?.disconnect()
    })

    return { viewport, absolute, raw: rect, update }
}