interface ModuleExports {
  [key: string]: unknown;
}

interface Modules {
  [key: string]: ModuleExports;
}

const STORAGE_KEY = "app_data_modules";

/**
 * This function collects all exports from files in the data directory
 * and creates an object where each key is the filename and the value
 * contains all exports from that file.
 */
export async function getDataModules(): Promise<Modules> {
  try {
    // Get all files in the current directory except localStorage.ts
    const modules = import.meta.glob<ModuleExports>(["./!(localStorage).ts"]);
    const result: Modules = {};

    // Load all modules
    for (const path in modules) {
      const module = await modules[path]();
      // Remove './' from the start and '.ts' from the end
      const fileName = path.replace(/^\.\//, "").replace(/\.ts$/, "");
      result[fileName] = module;
    }

    return result;
  } catch (error) {
    console.error("Error collecting data exports:", error);
    return {};
  }
}

/**
 * Saves the modules data to localStorage
 */
export async function saveToLocalStorage(): Promise<void> {
  try {
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (!storedData) {
      const modules = await getDataModules();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(modules));
    }
  } catch (error) {
    console.error("Error saving to localStorage:", error);
  }
}

/**
 * Gets the modules data from localStorage
 */
export function getFromLocalStorage(): Modules | null {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return null;
  }
}

/**
 * Syncs additional data with the existing modules
 * @param additionalData - Object containing additional module data to sync
 */
export async function syncWithAdditionalData(
  additionalData: Record<string, ModuleExports>
): Promise<void> {
  try {
    // Get current modules
    const modules = await getDataModules();

    // Merge with additional data
    const mergedData = {
      ...modules,
      ...additionalData,
    };

    // Save to localStorage
    localStorage.setItem(STORAGE_KEY, JSON.stringify(mergedData));
  } catch (error) {
    console.error("Error syncing additional data:", error);
  }
}

/**
 * Updates specific properties within a module while preserving other data
 * @param moduleName - The name of the module to update
 * @param propertyKey - The property key to add or update
 * @param propertyData - The data to store for that property
 */
export function updateModuleProperty(
  moduleName: string,
  propertyKey: string,
  propertyData: unknown
): void {
  try {
    const storedData = getFromLocalStorage() || {};
    const moduleData = storedData[moduleName] || {};

    // Update or add the new property while preserving other properties
    storedData[moduleName] = {
      ...moduleData,
      [propertyKey]: propertyData,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(storedData));
  } catch (error) {
    console.error("Error updating module property:", error);
  }
}
