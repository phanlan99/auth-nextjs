import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    // 👇 Đây là cách thêm rules tùy chỉnh
    rules: {
      "@typescript-eslint/no-explicit-any": "off", // ✅ Tắt rule gây lỗi
    },
  },
];

export default eslintConfig;
