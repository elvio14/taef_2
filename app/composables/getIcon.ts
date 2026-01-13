import YAML from 'yaml'
import iconsRaw from '../assets/icons.yml?raw'

type IconEntry = { id: string; name: string; link?: string; svg?: string }
const icons: IconEntry[] = YAML.parse(iconsRaw) as IconEntry[]

export function getIconSVG(id: string): string {
    if (!id) return ''
    const name = id.trim().toLowerCase()
    const found = icons.find(e => e.id?.toLowerCase() === name)
    return (found?.svg ?? '').trim()
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