export type ImuniAnalyticsEvent = "imuni_start" | "imuni_lead" | "imuni_lead_completo";

type DataLayerWindow = Window & {
  dataLayer?: Array<Record<string, unknown>>;
};

export function trackImuniEvent(event: ImuniAnalyticsEvent) {
  if (typeof window === "undefined") return;

  const payload = { source: "imuni", event };

  try {
    const dataLayer = (window as DataLayerWindow).dataLayer;
    if (Array.isArray(dataLayer)) {
      dataLayer.push({ event });
    }
  } catch {
    // dataLayer may be unavailable
  }

  try {
    if (window.parent && window.parent !== window) {
      window.parent.postMessage(payload, "*");
    }
  } catch {
    // Cross-origin frame access can throw; postMessage itself is safe.
  }
}
