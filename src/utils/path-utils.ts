// Vite injects the configured `base` here (always ends with '/').
const baseUrl = import.meta.env.BASE_URL;

export const p = (path: string) => `${baseUrl}${path.replace(/^\//, '')}`;
