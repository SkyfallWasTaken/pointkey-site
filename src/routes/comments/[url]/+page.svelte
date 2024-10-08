<script lang="ts">
	import type { PageData } from './$types';
	import Comment from '$lib/components/Comment.svelte';
	import Textarea from '$lib/components/Textarea.svelte';
	import { signIn } from '@auth/sveltekit/client';

	export let data: PageData;
</script>

<div class="flex flex-col gap-6">
	<h1 class="text-3xl font-bold">
		{data.comments.length || 'No'}
		{data.comments.length == 1 ? 'comment' : 'comments'} on {data.url}
	</h1>
	{#if data.session}
		<Textarea url={data.url} />
	{:else}
		<div
			class="rounded-lg flex flex-col items-center text-center py-8 gap-2 border border-surface-500 p-4"
		>
			<h2 class="text-xl font-semibold">Sign in to leave a comment</h2>
			<p class="opacity-50">It's free, and takes just 30 seconds. Why not give it a try?</p>
			<button class="btn variant-filled-secondary" on:click={() => signIn()}>Sign in</button>
		</div>
	{/if}
	<ul class="flex flex-col gap-2">
		{#each data.comments as comment}
			<li>
				<Comment {comment} />
			</li>
		{/each}
	</ul>
</div>
