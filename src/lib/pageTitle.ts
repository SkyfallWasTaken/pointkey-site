import { LRUCache } from 'lru-cache';
import { parse as parseHtml, HTMLElement } from 'node-html-parser';

export const pageTitles: LRUCache<string, string> = new LRUCache({
	max: 500,

	maxSize: 5000,
	sizeCalculation: () => {
		return 1;
	},

	ttl: 1000 * 60 * 5, // 5 minutes

	updateAgeOnGet: false,
	updateAgeOnHas: false,

	fetchMethod: async (key, staleValue, { signal }) => {
		try {
			const response = await fetch(key, { signal });
			const html = await response.text();
			const doc = parseHtml(html);
			return getPageTitle(doc) || staleValue;
		} catch (error) {
			console.error('Failed to fetch fresh page title:', error);
			return staleValue; // Return stale value if fetch fails
		}
	}
});

function getPageTitle(document: HTMLElement): string | undefined {
	// Check the og:title meta tag
	const ogTitle = document.querySelector('meta[property="og:title"]');
	if (ogTitle && ogTitle.getAttribute('content')) return ogTitle.getAttribute('content');

	// Check the meta title tag
	const metaTitle = document.querySelector('meta[name="title"]');
	if (metaTitle && metaTitle.getAttribute('content')) return metaTitle.getAttribute('content');

	// Check the twitter:title meta tag
	const twitterTitle = document.querySelector('meta[name="twitter:title"]');
	if (twitterTitle && twitterTitle.getAttribute('content'))
		return twitterTitle.getAttribute('content');

	// Check the <title> tag
	const titleTag = document.querySelector('title');
	if (titleTag) return titleTag.textContent || '';

	// If no title found
	return undefined;
}
