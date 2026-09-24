export interface AuthUser {
  id: string
  fullName: string
  email: string
  phone: string
  password?: string
}

const USERS_KEY = "techmart_users"
const CURRENT_USER_KEY = "techmart_current_user"

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function writeJSON<T>(key: string, value: T) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function getUsers(): AuthUser[] {
  return readJSON<AuthUser[]>(USERS_KEY, [])
}

export function saveUsers(users: AuthUser[]) {
  writeJSON(USERS_KEY, users)
}

export function getCurrentUser(): AuthUser | null {
  return readJSON<AuthUser | null>(CURRENT_USER_KEY, null)
}

export function setCurrentUser(user: AuthUser | null) {
  writeJSON(CURRENT_USER_KEY, user)
}

export function logoutUser() {
  setCurrentUser(null)
}
