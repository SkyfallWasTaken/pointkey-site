<script lang="ts">
	import type { PageData } from './$types';
	import Comment from '$lib/components/Comment.svelte';

	export let data: PageData;
</script>

<h1 class="text-3xl font-bold mb-2">{data.comments.length} comments on {data.url}</h1>
<ul class="flex gap-2">
	{#each data.comments as comment}
		<li>
			<Comment {comment} />
		</li>
	{/each}
</ul>