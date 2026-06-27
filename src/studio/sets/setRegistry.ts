export type SetRegistryEntry = {
  id: string;
  name: string;
  manifestPath: string;
};

export const setRegistry: SetRegistryEntry[] = [
  {
    id: "starter-studio",
    name: "Development Starter Set",
    manifestPath: "/sets/starter-studio/manifest.json"
  }
];
