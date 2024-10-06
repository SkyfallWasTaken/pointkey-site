<script lang="ts">
	import type { PageData } from './$types';
	import Comment from '$lib/components/Comment.svelte';
	import Textarea from '$lib/components/Textarea.svelte';

	export let data: PageData;
</script>

<div class="flex flex-col gap-6">
	<h1 class="text-3xl font-bold">{data.comments.length} comments on {data.url}</h1>
	<Textarea />
	<ul class="flex gap-2">
		{#each data.comments as comment}
			<li>
				<Comment {comment} />
			</li>
		{/each}
	</ul>
</div>
