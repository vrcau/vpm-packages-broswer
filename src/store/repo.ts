// Utilities
import { defineStore } from 'pinia'
import type { Ref } from 'vue'
import { computed, ref } from 'vue'
import type {
  Package,
  PackageIndex,
  PackageVersion,
  Repo,
  RepoIndex,
} from '@/types/package'
import { getLatestVersion } from '@/utils/vpm'

export const useRepoStore = defineStore('repo', () => {
  const sourceRepo: Ref<null | Repo> = ref(null)
  const repo = computed(() => {
    if (sourceRepo.value === null)
      return null

    const tempRepo = {
      name: sourceRepo.value.name,
      author: sourceRepo.value.author,
      url: sourceRepo.value.url,
      packages: [],
    } as RepoIndex

    const packageIds = Object.keys(sourceRepo.value.packages)
    packageIds.forEach((id) => {
      const sourcePackage = sourceRepo.value?.packages[id]
      if (sourcePackage === undefined)
        return

      tempRepo.packages.push({
        latest: getLatestVersion(sourcePackage as Package) as PackageVersion,
        versions: sourcePackage.versions,
      })
    })

    return tempRepo
  })

  const hasData = computed(() => sourceRepo.value !== null)

  async function updateRepo(): Promise<Repo> {
    const response = await fetch('https://pkg-index.yuxiaviation.com/index.json')
    const responseRepo = (await response.json()) as Repo
    if (responseRepo !== null)
      sourceRepo.value = responseRepo

    return responseRepo
  }

  function getPackage(id: string): PackageIndex | undefined {
    return repo.value?.packages.find(pack => pack.latest.name === id)
  }

  return { sourceRepo, repo, hasData, updateRepo, getPackage }
})
