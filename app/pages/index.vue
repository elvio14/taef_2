<script lang="ts" setup>

const { data: projects } = await useAsyncData('projects', () => {
  return queryCollection('projects')
    .order('date', 'DESC')
    .all()
})

</script>
<template>
    <div>
        <h2>Hello World</h2>
        <div v-for="p in projects" :key="p.date">
            {{p.title}}
        </div>
    </div>
</template>
