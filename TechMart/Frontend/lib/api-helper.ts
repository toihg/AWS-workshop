export function getApiBaseUrl(): string {
  if (typeof window !== "undefined") return ""

  const raw = process.env.API_URL || process.env.NEXT_PUBLIC_API_URL || "http://backend:8080/api"
  const clean = raw.replace(/\/$/, "")
  return clean.endsWith("/api") ? clean : `${clean}/api`
}

export function buildApiUrl(endpoint: string): string {
  const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`
  const baseUrl = getApiBaseUrl()

  return baseUrl ? `${baseUrl}${normalizedEndpoint}` : normalizedEndpoint
}

export function fetchApi(endpoint: string, options?: RequestInit) {
  return fetch(buildApiUrl(endpoint), options)
}