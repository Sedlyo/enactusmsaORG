/* eslint-disable @typescript-eslint/no-explicit-any */
import path from "path"
import fs from "fs"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import type { Plugin } from "vite"
import multer from "multer"

function uploadPlugin(): Plugin {
  const uploadsDir = path.resolve(__dirname, "public/assets/uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadsDir),
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext)
        .replace(/[^a-zA-Z0-9-_]/g, "-")
        .toLowerCase();
      cb(null, `${name}-${Date.now()}${ext}`);
    },
  });

  const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (_req, file, cb) => {
      const allowed = ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/gif"];
      cb(null, allowed.includes(file.mimetype));
    },
  });

  return {
    name: "upload-api",
    configureServer(server) {
      server.middlewares.use("/api/upload", (req, res, next) => {
        if (req.method === "POST") {
          upload.single("image")(req as any, res as any, (err: any) => {
            if (err) return res.writeHead(400).end(JSON.stringify({ error: err.message }));
            const file = (req as any).file;
            if (!file) return res.writeHead(400).end(JSON.stringify({ error: "No valid image" }));
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ path: `/assets/uploads/${file.filename}` }));
          });
        } else if (req.method === "DELETE") {
          let body = "";
          req.on("data", (chunk) => (body += chunk));
          req.on("end", () => {
            try {
              const { path: filePath } = JSON.parse(body);
              if (!filePath?.startsWith("/assets/uploads/")) {
                return res.writeHead(400).end(JSON.stringify({ error: "Invalid path" }));
              }
              const fullPath = path.resolve(__dirname, "public", filePath.slice(1));
              if (fs.existsSync(fullPath)) fs.unlinkSync(fullPath);
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ ok: true }));
            } catch {
              res.writeHead(400).end(JSON.stringify({ error: "Bad request" }));
            }
          });
        } else {
          next();
        }
      });
    },
  };
}

export default defineConfig({
  base: '/',
  plugins: [react(), uploadPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
