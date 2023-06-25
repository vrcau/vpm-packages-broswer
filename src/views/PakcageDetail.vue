<script setup lang="ts">
import { ref } from 'vue'
import { useRepoStore } from '@/store/repo'

const props = defineProps<{
  id: string
}>()

const selectedVersion = ref('')

const repoStore = useRepoStore()
const pack = repoStore.getPackage(props.id)
</script>

<template>
  <div class="package-detail-header">
    <div class="package-detail-header-title">
      <div class="text-caption">
        {{ pack?.latest.name }}
      </div>
      <div class="text-h3">
        {{ pack?.latest.displayName }}
      </div>
    </div>
  </div>
  <div class="ma-5">
    <div class="text-h4">
      Available Versions
    </div>
    <v-tabs v-model="selectedVersion">
      <v-tab v-for="version in pack?.versions" :key="version.version" :value="version.version">
        release {{ version.version }}
      </v-tab>
    </v-tabs>

    <div class="text-h5 mt-3">
      Release v0.0.1
    </div>
    <div>反正就是一大堆更新日志</div>
  </div>
</template>

<style scoped>
.package-detail-header {
  background-image: url("/v320neo.png");
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: cover;
  min-height: 340px;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.package-detail-header-title {
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 1rem;
}
</style>
