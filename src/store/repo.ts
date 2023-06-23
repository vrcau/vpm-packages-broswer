// Utilities
import {
  Package,
  PackageIndex,
  PackageVersion,
  Repo,
  RepoIndex,
} from "@/types/package";
import { getLatestVersion } from "@/utils/vpm";
import { defineStore } from "pinia";
import { Ref, computed, ref } from "vue";

export const useRepoStore = defineStore("repo", () => {
  const sourceRepo: Ref<null | Repo> = ref(null);
  const repo = computed(() => {
    if (sourceRepo.value === null) return null;

    const tempRepo = {
      name: sourceRepo.value.name,
      author: sourceRepo.value.author,
      url: sourceRepo.value.url,
      packages: [],
    } as RepoIndex;

    const packageIds = Object.keys(sourceRepo.value.packages);
    packageIds.forEach((id) => {
      const sourcePackage = sourceRepo.value?.packages[id];
      if (sourcePackage === undefined) return;

      tempRepo.packages.push({
        latest: getLatestVersion(sourcePackage as Package) as PackageVersion,
        versions: sourcePackage.versions,
      });
    });

    return tempRepo;
  });

  async function updateRepo(): Promise<Repo> {
    const response = await fetch("/index.json");
    const responseRepo = (await response.json()) as Repo;
    if (responseRepo !== null) sourceRepo.value = responseRepo;

    return responseRepo;
  }

  function getPackage(id: string): PackageIndex | undefined {
    return repo.value?.packages.find((pack) => pack.latest.name === id);
  }

  return { sourceRepo, repo, updateRepo, getPackage };
});
