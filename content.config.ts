import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
    collections: {
        projects: defineCollection({
            type: 'data',
            source: 'projects/**.yml',
            schema: z.object({
                title: z.string(),
                images: z.array(z.string()),
                gif: z.string(),
                points: z.object({
                    subtitle: z.string(),
                    description: z.string()
                }),
                urls: z.object({
                    isGithub: z.boolean(),
                    url: z.string()
                }),
                date: z.string().date()  //YYYY-MM-DD
            })
        })
    }
})

