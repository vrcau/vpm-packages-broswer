<script setup lang="ts">
import { onMounted } from 'vue'
import { useRepoStore } from './store/repo'

const repoStore = useRepoStore()

onMounted(async () => {
  await repoStore.updateRepo()
})
</script>

<template>
  <v-app>
    <v-layout>
      <v-system-bar window color="black">
        VRChat Aerospace University Packages Browser
        <v-spacer />
      </v-system-bar>
      <v-navigation-drawer permanent width="340" class="px-2 pt-2">
        <div class="mx-2 mt-2 mb-1">
          <div class="text-caption">
            {{ repoStore.repo?.name }}
          </div>
          <div class="text-h4 ">
            Available Packages
          </div>
        </div>
        <v-list>
          <v-list-item
            v-for="pack in repoStore.repo?.packages"
            :key="pack.latest.displayName" color="secondary"
            :to="`/packages/${pack.latest.name}`" nav variant="outlined"
          >
            <div class="ma-2 d-flex align-center">
              <v-icon icon="mdi-package-variant" size="36" class="mr-3" />
              <div>
                <div class="text-caption">
                  {{ pack.latest.name }}
                </div>
                <div class="text-h5">
                  {{ pack.latest.displayName }}
                </div>
              </div>
            </div>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <RouterView />
      </v-main>
    </v-layout>
  </v-app>
</template>
