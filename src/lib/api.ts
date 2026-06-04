import Constants from "expo-constants";

/**
 * Returns the base URL for Expo API routes.
 *
 * - Development: uses Metro dev-server host so the call reaches the same
 *   machine whether running on a simulator or a physical device.
 * - Production: reads EXPO_PUBLIC_API_URL from the environment.
 */
export function getApiBaseUrl(): string {
  if (__DEV__) {
    const hostUri = Constants.expoConfig?.hostUri;
    if (hostUri) {
      // hostUri is "<ip>:<port>" — keep as-is, prefix with http
      return `http://${hostUri}`;
    }
    return "http://localhost:8081";
  }
  return process.env.EXPO_PUBLIC_API_URL ?? "";
}
