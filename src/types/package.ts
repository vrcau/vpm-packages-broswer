export interface RepoIndex {
  name: string;
  author: string;
  url: string;
  packages: PackageIndex[];
}

export interface PackageIndex {
  latest: PackageVersion;
  versions: Record<string, PackageVersion>;
}

export interface Repo {
  name: string;
  author: string;
  url: string;
  packages: Record<string, Package>;
}

export interface Package {
  versions: Record<string, PackageVersion>;
}

export interface PackageVersion {
  name: string;
  displayName: string;
  version: string;
  unity?: string;
  vrchatVersion?: string;
  description: string;
  dependencies?: Record<string, string>;
  vpmDependencies?: Record<string, string>;
  gitDependencies?: Record<string, string>;
  samples?: Sample[];
  author: Author;
  hideInEditor: boolean;
  url: string;
  repo: string;
  legacyFolders: Record<string, string>;
}

export interface Sample {
  displayName: string;
  description: string;
  path: string;
}

export interface Author {
  name: string;
  email: string;
  url: string;
}
