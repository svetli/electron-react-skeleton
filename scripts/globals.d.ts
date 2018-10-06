type PackageLookup = { [key: string]: string }

type Package = {
  dependencies: PackageLookup
  devDependencies: PackageLookup
}
