// Renders a tool's square app icon SVG into the PNGs iOS/Android need, same as recipes.ka21.me:
// icon-180.png (apple-touch-icon), icon-192.png and icon-512.png (web app manifest).
// Usage: node icons/render-icons.mjs <icon.svg> <output dir>
import { Resvg } from "@resvg/resvg-js";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const [src, outDir] = process.argv.slice(2);
if (!src || !outDir) {
  console.error("Usage: node icons/render-icons.mjs <icon.svg> <output dir>");
  process.exit(1);
}
const svg = await readFile(src, "utf8");
await mkdir(outDir, { recursive: true });
for (const size of [180, 192, 512]) {
  const png = new Resvg(svg, { fitTo: { mode: "width", value: size } }).render().asPng();
  await writeFile(join(outDir, `icon-${size}.png`), png);
  console.log(`wrote ${join(outDir, `icon-${size}.png`)}`);
}
