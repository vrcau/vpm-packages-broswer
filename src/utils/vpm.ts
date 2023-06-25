import type { Package } from '@/types/package'

export function getLatestVersion(pack: Package) {
  const versions = Object.keys(pack.versions)
  if (versions.length === 0)
    return null

  return pack.versions[versions.at(-1) as string]
}
