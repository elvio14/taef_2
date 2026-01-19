export default function openUrl(url?: string){
    if (!url) return
    if (typeof window === 'undefined') return
    window.open(url, '_blank', 'noopener')
}