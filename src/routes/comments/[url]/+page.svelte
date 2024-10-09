<script lang="ts">
	import type { PageData } from './$types';
	import Comment from '$lib/components/Comment.svelte';
	import Editor from '$lib/components/Editor.svelte';
	import { signIn } from '@auth/sveltekit/client';

	export let data: PageData;
</script>

<div class="flex justify-center items-center mt-8 md:mt-10 mx-4 md:mx-0">
	<div
		class="flex flex-col gap-6 shadow-sm px-6 py-8 w-full md:w-5/6 lg:w-1/2 border-surface-600 border-2 rounded-lg"
	>
		<h1 class="text-3xl font-bold">
			{data.comments.length || 'No'}
			{data.comments.length == 1 ? 'comment' : 'comments'} on {data.title
				? `"${data.title}"`
				: data.url}
		</h1>
		{#if data.session}
			<Editor url={data.url} />
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
				<li class="border-b border-surface-600 last:border-b-0 p-4 last:pb-0">
					<Comment {comment} />
				</li>
			{/each}
		</ul>
	</div>
</div>
