export function getGithubURL(id: string){
    if(id.includes("/")){
        return `https://www.github.com/${id}`
    }else {
        return `https://www.github.com/elvio14/${id}`
    }
}

export function isGif(imagePath: string){
    return imagePath.toLowerCase().endsWith('.gif')
}