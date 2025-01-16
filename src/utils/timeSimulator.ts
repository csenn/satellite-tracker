const TIME_ON_LOAD = new Date();
const APP_DATE_START = new Date("2025-01-12T00:00:00Z");

// Unit is millseconds
export function timeSinceLoaded(): number {
  return new Date().getTime() - TIME_ON_LOAD.getTime();
}

// We are simulating time to be in sync with the hardcoded satellite data
export function getSimulatedTime(): Date {
  return new Date(APP_DATE_START.getTime() + timeSinceLoaded());
}
