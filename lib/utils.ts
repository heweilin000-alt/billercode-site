export const SITE_NAME = "Biller Codes Australia";
export const SITE_URL = "https://billercodes.com";
export const PER_PAGE = 50;

export const PAYMENT_METHOD_LABELS: Record<string, string> = {
  "1": "BPAY",
  "101": "BPAY View",
  "201": "BPAY Batch",
  "301": "BPAY Batch with Viewer",
};

export function formatPaymentMethods(
  m1: string,
  m2: string,
  m3: string,
  m4: string
): string[] {
  return [m1, m2, m3, m4]
    .filter(Boolean)
    .map((m) => PAYMENT_METHOD_LABELS[m] || m);
}
