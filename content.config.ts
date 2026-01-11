import { defineCollection, defineContentConfig } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
    collections: {
        projects: defineCollection({
            type: 'data',
            source: 'projects/**.yml',
            schema: z.object({
                id: z.string(),
                title: z.string(),
                images: z.array(z.string()),
                gif: z.string(),
                stack: z.array(z.string()),
                points: z.array(z.string()),
                urls: z.object({
                    isGithub: z.boolean(),
                    url: z.string()
                }),
                date: z.string().date()  //YYYY-MM-DD
            })
        })
    }
})

