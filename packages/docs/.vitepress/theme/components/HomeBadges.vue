<script setup lang="ts">
/**
 * 首页按钮式徽章（GitHub license + npm version + npm downloads）
 *
 * 渲染在 VitePress 首页 hero 之后，作为各语言首页的共享组件。
 */
const badges = [
	{
		alt: 'license',
		src: 'https://img.shields.io/github/license/MengXi-Studio/create-uni-app.svg',
		href: 'https://github.com/MengXi-Studio/create-uni-app/blob/master/LICENSE'
	},
	{
		alt: 'npm version',
		src: 'https://img.shields.io/npm/v/@meng-xi/create-uni-app?color=blue',
		href: 'https://www.npmjs.com/package/@meng-xi/create-uni-app'
	},
	{
		alt: 'npm downloads',
		src: 'https://img.shields.io/npm/dt/@meng-xi/create-uni-app?color=green',
		href: 'https://www.npmjs.com/package/@meng-xi/create-uni-app'
	}
]
</script>

<template>
	<div class="home-badges">
		<a v-for="b in badges" :key="b.alt" :href="b.href" target="_blank" rel="noopener">
			<img :src="b.src" :alt="b.alt" />
		</a>
	</div>
</template>

<style scoped>
.home-badges {
	display: flex;
	justify-content: center;
	gap: 8px;
	margin-top: 8px;
	flex-wrap: wrap;
}

.home-badges a {
	text-decoration: none;
}
</style>