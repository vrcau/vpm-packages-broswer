<script setup lang="ts">
import type { PackageVersion } from '@/types/package'

defineProps<{
  version: PackageVersion
  latestVersion: string | null | undefined
}>()
</script>

<template>
  <v-card class="mb-2">
    <v-card-title>
      v{{ version.version }}
      <v-chip v-if="version.version === latestVersion" color="primary" variant="elevated" class="ml-2">
        Latest
      </v-chip>
    </v-card-title>
    <v-card-text>
      {{ version.description }}
    </v-card-text>
    <v-card-title>VPM Dependencies</v-card-title>
    <v-card-text v-if="version.vpmDependencies !== undefined">
      <p v-for="dependency in Object.keys(version.vpmDependencies)" :key="dependency">
        {{ dependency }} - {{ version.vpmDependencies[dependency] }}
      </p>
    </v-card-text>
    <v-card-title>Git Dependencies</v-card-title>
    <v-card-text v-if="version.gitDependencies !== undefined">
      <div
        v-for="dependency in Object.keys(version.gitDependencies)" :key="dependency"
      >
        <p>{{ dependency }}:</p>
        <v-code>{{ version.gitDependencies[dependency] }}</v-code>
      </div>
    </v-card-text>
  </v-card>
</template>
