import YAML from 'yaml'
import iconsRaw from '../assets/icons.yml?raw'

type IconEntry = { id: string; name: string; link?: string; svg?: string }
const icons: IconEntry[] = YAML.parse(iconsRaw) as IconEntry[]

let iconCounter = 0

export function getIconSVG(id: string): string {
    if (!id) return ''
    const name = id.trim().toLowerCase()
    const found = icons.find((e: IconEntry) => e.id?.toLowerCase() === name)
    let svg = (found?.svg ?? '').trim()
    
    if (!svg) return ''
    
    // make all internal IDs unique per call
    const uid = `i${iconCounter++}`
    
    // replace id="..." with id="i123-..."
    svg = svg.replace(/id="([^"]+)"/g, (_, p1) => `id="${uid}-${p1}"`)
    
    // replace url(#...) with url(#i123-...)
    svg = svg.replace(/url\(#([^)]+)\)/g, (_, p1) => `url(#${uid}-${p1})`)
    
    // replace href="#..." and xlink:href="#..."
    svg = svg.replace(/xlink:href="#([^"]+)"/g, (_, p1) => `xlink:href="#${uid}-${p1}"`)
    svg = svg.replace(/href="#([^"]+)"/g, (_, p1) => `href="#${uid}-${p1}"`)
    
    return svg
}

export function getIconLink(id: string): string {
    if(!id) return ''
    const name = id.trim().toLowerCase()
    const found = icons.find(e => e.id?.toLowerCase() === name)
    return (found?.link ?? '').trim()
}

export function getIconName(id: string): string {
    if(!id) return ''
    const name = id.trim().toLowerCase()
    const found = icons.find(e => e.id?.toLowerCase() === name)
    return (found?.name ?? '').trim()
}