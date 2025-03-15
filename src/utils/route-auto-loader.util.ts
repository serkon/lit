import { LitElement } from "lit-element/lit-element";

export const autoRegisterPages = async () => {
  const routes: any[] = [];

  const pageModules = import.meta.glob("../pages/**/*.page.ts", {
    eager: true,
  });

  for (const path in pageModules) {
    const module = pageModules[path] as Record<string, typeof LitElement>;
    
    if (!module || Object.keys(module).length === 0) continue;

    const [componentName] = Object.keys(module);
    const componentClass = module[componentName];
    const { route } = componentClass as any;

    if (!route) continue;

    const { component: _, ...cleanRoute } = route;
    
    // Web Component'i kaydet
    const tagName = toKebabCase(componentName);
    if (!customElements.get(tagName)) {
      customElements.define(tagName, componentClass);
    }

    // Route yapısını oluştur
    routes.push({
      component: tagName, // Buradaki component kesinlikle tagName olacak
      ...cleanRoute
    });
  }

  return routes;
};

const toKebabCase = (input: string) => {
  return input
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[_\s]+/g, "-")
    .replace(/-+/g, "-")
    .toLowerCase();
};
