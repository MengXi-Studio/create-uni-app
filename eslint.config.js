import eslint from '@eslint/js'
import { defineConfig } from 'eslint/config'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import globals from 'globals'

/**
 * create-uni-app monorepo 统一 ESLint 配置（flat config）
 *
 * 覆盖范围：packages/core 的 TS 源码、packages/docs 的 VitePress 配置（.mts）等，
 * 并通过 Prettier 插件与根 .prettierrc 保持代码风格一致。
 */
export default defineConfig(
	// 全局忽略配置
	{
		ignores: [
			// 依赖目录
			'**/node_modules/',
			// 构建输出目录
			'**/dist/',
			'**/.vitepress/dist/',
			'**/.vitepress/cache/',
			// Git 目录
			'.git/',
			// 包管理锁文件
			'pnpm-lock.yaml',
			'package-lock.json',
			'yarn.lock',
			// 编辑器配置文件
			'.vscode/',
			'.idea/',
			'**/*.swp',
			'**/*.swo',
			'**/*~',
			// 环境变量文件
			'.env',
			'.env.local',
			'.env.*.local',
			// 日志文件
			'logs/',
			'**/*.log',
			'npm-debug.log*',
			'yarn-debug.log*',
			'yarn-error.log*',
			'pnpm-debug.log*',
			'lerna-debug.log*',
			// OS 生成的文件
			'.DS_Store',
			'Thumbs.db',
			// 模板片段（带占位符，非真实源码）
			'packages/core/templates/',
			// 其他文件
			'**/*.md',
			'**/*.d.ts'
		]
	},
	// ESLint 推荐规则
	eslint.configs.recommended,
	// TypeScript ESLint 推荐规则
	...tseslint.configs.recommended,
	// Prettier 配置（禁用与 Prettier 冲突的规则）
	eslintConfigPrettier,
	// 自定义配置
	{
		languageOptions: {
			ecmaVersion: 2022,
			sourceType: 'module',
			globals: {
				...globals.node,
				...globals.browser,
				...globals.es2021
			}
		},
		plugins: {
			prettier: eslintPluginPrettier
		},
		rules: {
			// 基本规则
			'no-console': 'off',
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
			'no-undef': 'off',
			'prettier/prettier': 'error',
			'@typescript-eslint/no-explicit-any': 'off',
			// CLI 为 CommonJS，运行时需 require() 读取 package.json 版本号
			'@typescript-eslint/no-require-imports': 'off'
		}
	}
)
