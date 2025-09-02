import { nanoid } from "nanoid";

export function generateUsername(name?: string) {
  let base = "";

  if (name) {
    base = name
      .trim()
      .replace(/\s+/g, "_")
      .replace(/[^a-zA-Z0-9_]/g, "");

    base = base + "_" + nanoid(4);
  }

  if (!base) {
    base = `user_${nanoid(7)}`;
  }

  return base.toLowerCase();
}
