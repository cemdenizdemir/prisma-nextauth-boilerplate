export function getUserIPFromHeaders(req: Request): string {
  const xf = req.headers.get("x-forwarded-for");
  const ip =
    xf?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "127.0.0.1";
  return ip;
}
