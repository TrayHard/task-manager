export function addPath<T, K extends keyof T>(obj: T, moduleName: string): Record<K, string> {
    return Object.entries(obj).reduce((acc: any, [key, value]) => {
        acc[key] = `${moduleName}/${value}`;
        return acc
    }, {} as Record<K, string>)
}

// function addPath<K, V, T extends {[key: K]: V}>(obj: T, path: string): {[key: K]: V}