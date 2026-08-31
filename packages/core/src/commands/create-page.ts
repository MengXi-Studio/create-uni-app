/**
 * create 建页子命令
 *
 * 在当前 uni-app 项目中创建新页面，并适配不同的工程形态：
 *  - 传统模式：自动注册到 src/pages.json（主包 pages 或分包 subPackages）
 *  - 手动 uni-router：另向 src/router.config 追加路由条目
 *  - generatePages / generateUni：pages.json 由插件自动生成，仅生成页面文件、不手动改写
 * 参考 create-taro 的 taro create 命令体验。
 */
import fs from 'node:fs';
import path from 'node:path';
import prompts from 'prompts';

/** 当前 uni-app 工程的形态探测结果 */
interface ProjectContext {
  /** 主入口扩展名 */
  ext: 'ts' | 'js';
  /** CSS 预处理器 */
  cssExt: 'scss' | 'less' | 'stylus' | 'css';
  /** 分包根目录列表（如 pages-sub，目录位于 src/${root}） */
  subpackages: string[];
  /** pages.json 是否由 generatePages / generateUni 插件自动生成 */
  autoPages: boolean;
  /** 手动 uni-router 的路由配置文件路径（存在 router.config 时非空） */
  manualRouter: string | null;
}

/**
 * 探测当前项目形态（脚本语言 / CSS / 分包 / 页面生成方式 / 路由方式）。
 *
 * @param srcDir src 目录绝对路径
 * @param cwd 项目根目录
 * @returns 探测结果
 */
function detectContext(srcDir: string, cwd: string): ProjectContext {
  const hasMainTs = fs.existsSync(path.join(srcDir, 'main.ts'));
  const ext = hasMainTs ? ('ts' as const) : ('js' as const);

  let cssExt: ProjectContext['cssExt'] = 'css';
  try {
    const pkg = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json'), 'utf8')) as {
      devDependencies?: Record<string, string>;
      dependencies?: Record<string, string>;
    };
    const deps = { ...(pkg.devDependencies ?? {}), ...(pkg.dependencies ?? {}) };
    if (deps.sass) cssExt = 'scss';
    else if (deps.less) cssExt = 'less';
    else if (deps.stylus) cssExt = 'stylus';
  } catch {
    cssExt = 'css';
  }

  // 分包：遵循 generatePages/generateUni 默认约定 src/pages-sub（root 为 pages-sub）
  const subpackages = fs.existsSync(path.join(srcDir, 'pages-sub')) ? ['pages-sub'] : [];

  // pages.json 是否由插件自动生成（generatePages / generateUni）
  let autoPages = false;
  if (fs.existsSync(path.join(cwd, 'vite.config.js'))) {
    const viteConfig = fs.readFileSync(path.join(cwd, 'vite.config.js'), 'utf8');
    autoPages = viteConfig.includes('generateUni') || viteConfig.includes('generatePages');
  }

  // 手动 uni-router：存在 src/router.config.ts 或 .js
  let manualRouter: string | null = null;
  for (const name of [`router.config.${ext}`, 'router.config.ts', 'router.config.js']) {
    const p = path.join(srcDir, name);
    if (fs.existsSync(p)) {
      manualRouter = p;
      break;
    }
  }

  return { ext, cssExt, subpackages, autoPages, manualRouter };
}

/**
 * 生成一个页面 vue 文件内容。
 *
 * @param pageName 页面名
 * @param scriptOpen 脚本标签（含 lang）
 * @param cssExt 样式扩展名
 * @returns 页面文件内容
 */
function buildPageContent(pageName: string, scriptOpen: string, cssExt: ProjectContext['cssExt']): string {
  const styleLang = cssExt === 'css' ? '' : ` lang="${cssExt}"`;
  return `<template>
  <view class="container">
    <text class="title">${pageName}</text>
  </view>
</template>

${scriptOpen}
const title = '${pageName}'
</script>

<style${styleLang} scoped>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }

  .title {
    font-size: 32rpx;
    color: #333;
  }
</style>
`;
}

/**
 * 向手动 uni-router 的 router.config 追加一个路由条目。
 *
 * @param routerPath router.config 文件路径
 * @param routePath 页面路径（如 /pages/x/x）
 * @param pageName 页面名
 */
function appendRouterEntry(routerPath: string, routePath: string, pageName: string): void {
  const content = fs.readFileSync(routerPath, 'utf8');
  const entry = [
    '  {',
    `    name: '${pageName}',`,
    `    path: '${routePath}',`,
    `    meta: { title: '${pageName}' },`,
    '  },',
    '',
  ].join('\n');
  const lastBracket = content.lastIndexOf(']');
  if (lastBracket === -1) {
    console.warn(`ℹ️  未识别到路由数组，跳过 router.config 的写入：${routerPath}`);
    return;
  }
  const updated = content.slice(0, lastBracket) + entry + content.slice(lastBracket);
  fs.writeFileSync(routerPath, updated, 'utf8');
}

/**
 * 在 cwd 的 uni-app 项目中创建一个新页面。
 *
 * @param pageNameFromArg 通过命令行传入的页面名，可为空
 * @param subpackageFromArg 目标分包 root（如 pages-sub），可为空
 */
export async function createPage(pageNameFromArg?: string, subpackageFromArg?: string): Promise<void> {
  const cwd = process.cwd();
  const srcDir = path.join(cwd, 'src');

  const ctx = detectContext(srcDir, cwd);

  // 1. 确定页面名
  let pageName = pageNameFromArg?.trim();
  if (!pageName) {
    const response = await prompts({
      type: 'text',
      name: 'pageName',
      message: '页面名称（小写字母/数字/中划线）：',
      validate: (value: unknown): string | boolean => {
        const v = String(value ?? '').trim();
        return /^[a-z0-9-]+$/.test(v) ? true : '仅支持小写字母、数字、中划线';
      },
    });
    if (response.pageName === undefined) {
      console.log('已取消');
      return;
    }
    pageName = String(response.pageName).trim();
  }

  // 2. 确定目标分包（主包 or 分包）
  let subRoot = subpackageFromArg?.trim();
  if (!subRoot && ctx.subpackages.length > 0) {
    const response = await prompts({
      type: 'select',
      name: 'target',
      message: '页面创建到：',
      choices: [
        { title: '主包（pages/）', value: '' },
        ...ctx.subpackages.map((root) => ({ title: `分包（${root}/）`, value: root })),
      ],
    });
    // 用户取消：value 为 undefined → 默认主包并提示
    subRoot = response.target ?? '';
  }
  if (subRoot && !ctx.subpackages.includes(subRoot)) {
    console.error(`❌ 未找到分包：${subRoot}（可用：${ctx.subpackages.join(', ') || '无'}）`);
    process.exit(1);
  }

  // 3. 生成页面文件
  const pageRelDir = subRoot ? path.join(subRoot, pageName) : path.join('pages', pageName);
  const pageDir = path.join(srcDir, pageRelDir);
  fs.mkdirSync(pageDir, { recursive: true });
  const vuePath = path.join(pageDir, `${pageName}.vue`);
  const scriptOpen = ctx.ext === 'ts' ? '<script setup lang="ts">' : '<script setup>';
  fs.writeFileSync(vuePath, buildPageContent(pageName, scriptOpen, ctx.cssExt), 'utf8');

  // 4. 注册路由（跳过插件自动生成的页面配置）
  const routePath = `/${pageRelDir}/${pageName}`;
  if (!ctx.autoPages) {
    const pagesJsonPath = path.join(srcDir, 'pages.json');
    const pagesJson = JSON.parse(fs.readFileSync(pagesJsonPath, 'utf8')) as {
      pages: { path: string; style?: Record<string, unknown> }[];
      subPackages?: { root: string; pages: { path: string; style?: Record<string, unknown> }[] }[];
    };
    const style = { navigationBarTitleText: pageName };

    if (subRoot) {
      // 写入分包 subPackages
      pagesJson.subPackages = pagesJson.subPackages ?? [];
      let sub = pagesJson.subPackages.find((s) => s.root === subRoot);
      if (!sub) {
        sub = { root: subRoot, pages: [] };
        pagesJson.subPackages.push(sub);
      }
      const relPath = `${pageName}/${pageName}`;
      if (!sub.pages.some((p) => p.path === relPath)) {
        sub.pages.push({ path: relPath, style });
      }
    } else {
      // 写入主包 pages
      pagesJson.pages = pagesJson.pages ?? [];
      const absPath = `pages/${pageName}/${pageName}`;
      if (!pagesJson.pages.some((p) => p.path === absPath)) {
        pagesJson.pages.push({ path: absPath, style });
      }
    }
    fs.writeFileSync(pagesJsonPath, JSON.stringify(pagesJson, null, 2) + '\n', 'utf8');
  }

  // 5. 手动 uni-router：追加路由条目
  if (ctx.manualRouter) {
    appendRouterEntry(ctx.manualRouter, routePath, pageName);
  }

  // 6. 输出总结
  console.log(`✅ 页面已创建：${vuePath}`);
  if (ctx.autoPages) {
    console.log(`ℹ️  ${subRoot ? ctx.subpackages : '主包'}页面将由 generatePages/generateUni 自动注册到 pages.json`);
  } else {
    console.log(`📄 已注册路由：${routePath}`);
  }
  if (ctx.manualRouter) {
    console.log(`🔗 已追加 uni-router 路由：${ctx.manualRouter}`);
  }
}