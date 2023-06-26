<script setup lang="ts">
import type { Ref } from 'vue'
import { ref, watch } from 'vue'
import { useRepoStore } from '@/store/repo'
import type { PackageIndex } from '@/types/package'

const props = defineProps<{
  id: string
}>()

const repoStore = useRepoStore()

const pack: Ref<PackageIndex | undefined> = ref(undefined)
if (repoStore.hasData)
  pack.value = repoStore.getPackage(props.id)

watch(() => repoStore.hasData, (hasData) => {
  if (hasData)
    pack.value = repoStore.getPackage(props.id)
})

const selectedNavigationItem = ref([0])
</script>

<template>
  <div class="package-detail-banner">
    <v-sheet rounded="t-xl" class="pa-3 px-6 d-flex align-center">
      <div>
        <div class="text-caption">
          {{ pack?.latest.name }}
        </div>
        <div class="text-h3">
          {{ pack?.latest.displayName }}
        </div>
      </div>
      <v-btn :rounded="false" size="x-large" variant="flat" color="primary" class="mx-6" prepend-icon="mdi-download">
        Install
      </v-btn>
    </v-sheet>
  </div>
  <v-layout full-height>
    <v-navigation-drawer location="right" permanent color="transparent" width="200">
      <v-list v-model:selected="selectedNavigationItem" mandatory nav density="compact">
        <v-list-item :value="0" prepend-icon="mdi-information-outline">
          About
        </v-list-item>
        <v-list-item :value="1" prepend-icon="mdi-note-text-outline">
          Releases
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main scrollable style="height: 50vh;">
      <v-window v-model="selectedNavigationItem" direction="vertical" class="pa-5 overflow-y-auto">
        <v-window-item>
          <v-card>
            <v-card-title>Description</v-card-title>
            <v-card-text>{{ pack?.latest.description }}</v-card-text>
            <v-card-title>
              Latest Version
              <v-chip class="ml-2" color="primary" variant="elevated">
                Release v{{ pack?.latest.version }}
              </v-chip>
            </v-card-title>
            <v-card-text>{{ pack?.latest.description }}</v-card-text>
            <v-card-title v-if="pack?.latest.vpmDependencies !== undefined">
              VPM Dependencies
            </v-card-title>
            <v-card-text v-if="pack?.latest.vpmDependencies !== undefined">
              <p v-for="dependency in Object.keys(pack.latest.vpmDependencies)" :key="dependency">
                {{ dependency }} - {{ pack.latest.vpmDependencies[dependency] }}
              </p>
            </v-card-text>
            <v-card-title v-if="pack?.latest.gitDependencies !== undefined">
              Git Dependencies
            </v-card-title>
            <v-card-text v-if="pack?.latest.gitDependencies !== undefined">
              <div
                v-for="dependency in Object.keys(pack.latest.gitDependencies)" :key="dependency"
              >
                <p>{{ dependency }}:</p>
                <v-code>{{ pack.latest.gitDependencies[dependency] }}</v-code>
              </div>
            </v-card-text>
          </v-card>
        </v-window-item>
        <v-window-item>
          <PackageVersionInfo v-for="version in pack?.versions" :key="version.version" :version="version" :latest-version="pack?.latest.version" />
        </v-window-item>
      </v-window>
    </v-main>
  </v-layout>
</template>

<style scoped>
.package-detail-banner {
  background-image: url("/v320neo.webp");
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: cover;
  min-height: 340px;
  height: 50vh;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
</style>
