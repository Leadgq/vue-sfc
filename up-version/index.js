import fs from "fs";
import path from "path";
import { exec } from "child_process";

const url = path.join(process.cwd(), "./package.json");
// 获取版本号
const upVersion = process.env.npm_config_setv;
const packPage = fs.readFileSync(url, "utf8");
try {
  const json = JSON.parse(packPage);
  json.version = upVersion;
  fs.writeFileSync(url, JSON.stringify(json, null, 2));
  const build = exec("npm run build");
  build.stdout.on("data", (chunk) => {
    console.log(chunk);
  });
} catch (e) {
  console.error("文件转换失败", e);
}
