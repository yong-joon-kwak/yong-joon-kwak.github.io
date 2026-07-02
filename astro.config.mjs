// @ts-check
import { defineConfig } from 'astro/config';
import expressiveCode from 'astro-expressive-code';
import vue from '@astrojs/vue';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// 본문 이미지를 figure/figcaption 으로 감싸는 경량 rehype 플러그인.
// alt 텍스트가 있고 문단(<p>) 안에 이미지 하나만 있는 경우에만 캡션으로 승격한다.
// (alt 가 빈 장식용 이미지는 그대로 둔다.) 외부 의존성 없이 hast 트리를 직접 순회한다.

/**
 * 순회에 필요한 최소한의 hast 노드 형태.
 * @typedef {{
 *   type: string,
 *   tagName?: string,
 *   value?: string,
 *   properties?: Record<string, unknown>,
 *   children?: HastNode[],
 * }} HastNode
 */

function rehypeImageFigure() {
  /** @param {HastNode} node */
  const isBlank = (node) =>
    node.type === 'text' && (node.value ?? '').trim() === '';

  /** @param {HastNode} node */
  const walk = (node) => {
    if (!node.children) return;
    node.children = node.children.map((child) => {
      walk(child);
      if (child.type !== 'element' || child.tagName !== 'p') return child;

      const meaningful = (child.children ?? []).filter((c) => !isBlank(c));
      const only = meaningful[0];
      if (
        meaningful.length !== 1 ||
        !only ||
        only.type !== 'element' ||
        only.tagName !== 'img' ||
        !only.properties ||
        !only.properties.alt
      ) {
        return child;
      }

      return {
        type: 'element',
        tagName: 'figure',
        properties: { className: ['post-figure'] },
        children: [
          only,
          {
            type: 'element',
            tagName: 'figcaption',
            properties: {},
            children: [{ type: 'text', value: String(only.properties.alt) }],
          },
        ],
      };
    });
  };

  /** @param {HastNode} tree */
  return (tree) => walk(tree);
}

// https://astro.build/config
export default defineConfig({
  site: 'https://yong-joon-kwak.github.io',
  base: '/', // GitHub Pages 배포 시 필요
  integrations: [
    expressiveCode({
      themes: ['github-light', 'github-dark'],
      useDarkModeMediaQuery: false,
      shiki: {
        langAlias: { MD: 'markdown' },
      },
      customizeTheme(theme) {
        theme.name = theme.type === 'dark' ? 'dark' : 'light';
      },
      styleOverrides: {
        borderRadius: '0.75rem',
        borderWidth: '1px',
        borderColor: 'var(--outline-variant)',
        codeBackground: 'var(--code-bg)',
        codeFontSize: '0.875rem',
        frames: {
          editorTabBarBackground: 'var(--surface-container-high)',
          editorTabBarBorderColor: 'var(--outline-variant)',
          editorTabBarBorderBottomColor: 'var(--outline-variant)',
          editorActiveTabBackground: 'var(--code-bg)',
          inlineButtonForeground: 'var(--text-muted)',
          inlineButtonBorder: 'var(--outline-variant)',
          tooltipSuccessBackground: 'var(--success)',
        },
      },
    }),
    vue(),
    tailwind(),
    sitemap(),
  ],
  markdown: {
    rehypePlugins: [rehypeImageFigure],
  },
});
