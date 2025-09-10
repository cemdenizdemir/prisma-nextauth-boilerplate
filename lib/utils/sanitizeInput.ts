// utils/sanitizeInput.ts
import DOMPurify from "dompurify";

type Primitive = string | number | boolean | null | undefined;

// Recursively sanitize any object
export function sanitizeInput<T>(data: T): T {
  if (typeof data === "string") {
    // Sanitize string values
    return DOMPurify.sanitize(data) as T;
  }

  if (Array.isArray(data)) {
    // Handle arrays
    return data.map((item) => sanitizeInput(item)) as T;
  }

  if (typeof data === "object" && data !== null) {
    // Handle objects
    const sanitizedObj: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      sanitizedObj[key] = sanitizeInput(value);
    }
    return sanitizedObj as T;
  }

  // Numbers, booleans, null, undefined remain unchanged
  return data;
}
