<script setup lang="ts">
import type { PackageIndex } from '@/types/package'

const props = defineProps<{
  repoUrl: string
  pack: PackageIndex
}>()

const tabIndex = ref(0)
const selectedVersion = ref(props.pack.latest.version)
</script>

<template>
  <v-card title="Install Package" :subtitle="`${pack.latest.name}`" width="900">
    <v-tabs v-model="tabIndex">
      <v-tab>Creator Companion</v-tab>
      <v-tab>VPM CLI</v-tab>
      <v-tab>Zip</v-tab>
    </v-tabs>
    <v-window v-model="tabIndex">
      <v-window-item>
        <v-timeline
          direction="vertical" class="px-5" density="compact"
          side="end"
        >
          <v-timeline-item>
            <div>
              <h6 class="text-h6">
                Add Repository To VCC
              </h6>
              <p class="text-body-2">
                Add repository manually follow
                <a target="_blank" href="https://vcc.docs.vrchat.com/guides/community-repositories#how-to-add-a-community-repository">vcc's docs</a>
                :
              </p>
              <v-code>{{ repoUrl }}</v-code>
              <p class="text-body-1 my-2">
                or just click
              </p>
              <v-btn :href="`vcc://vpm/addRepo?url=${repoUrl}`" variant="flat" color="primary">
                Add to VCC
              </v-btn>
            </div>
          </v-timeline-item>
          <v-timeline-item>
            <div>
              <h6 class="text-h6">
                Install Package for your project
              </h6>
              <p class="text-body-2">
                Click <strong><code>Manage Project</code></strong> on your project and select <strong><code>{{ pack.latest.version }}</code></strong> or any version you want to install
              </p>
              <v-img src="/install-guide-vcc-1.webp" />
              <v-img src="/install-guide-vcc-2.webp" />
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-window-item>
      <v-window-item>
        <v-timeline
          direction="vertical" class="px-5" density="compact"
          side="end"
        >
          <v-timeline-item>
            <div>
              <h6 class="text-h6">
                Install VPM CLI
              </h6>
              <p class="text-body-2">
                <a target="_blank" href="https://dotnet.microsoft.com/zh-cn/download">Install .NET 6 SDK.</a> Open terminal in your project directory and run the command:
              </p>
              <v-code>dotnet tool install --global vrchat.vpm.cli</v-code>
            </div>
          </v-timeline-item>
          <v-timeline-item>
            <div>
              <h6 class="text-h6">
                Add repository to VPM CLI
              </h6>
              <p class="text-body-2">
                Run the command to add repository to vpm cli:
              </p>
              <v-code>vpm add repo {{ repoUrl }}</v-code>
            </div>
          </v-timeline-item>
          <v-timeline-item>
            <div>
              <h6 class="text-h6">
                Install package for your project
              </h6>
              <p class="text-body-2">
                Run the command to add package:
              </p>
              <v-code>vpm add package {{ pack.latest.name }}</v-code>
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-window-item>
      <v-window-item>
        <v-timeline
          direction="vertical" class="px-5" density="compact"
          side="end"
        >
          <v-timeline-item>
            <div>
              <h6 class="text-h6">
                Download package .zip file
              </h6>
              <v-select
                v-model="selectedVersion"
                label="Select the version you want to download"
                :items="Object.keys(pack.versions)" variant="solo-filled"
                density="compact"
              />
              <a target="_blank" :href="pack.latest.url">{{ pack.versions[selectedVersion].url }}</a>
            </div>
          </v-timeline-item>
          <v-timeline-item>
            <div>
              <h6 class="text-h6">
                Decompression and install package
              </h6>
              <p class="text-body-2">
                Follow <a target="_blank" href="https://docs.unity3d.com/2019.4/Documentation/Manual/upm-ui-local.html">Unity Document: Installing a package from a local folder</a>
              </p>
            </div>
          </v-timeline-item>
        </v-timeline>
      </v-window-item>
    </v-window>
  </v-card>
</template>
