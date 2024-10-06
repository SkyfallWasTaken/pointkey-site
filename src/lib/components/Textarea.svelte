<script lang="ts">
	import { BoldIcon, ItalicIcon, StrikethroughIcon } from 'lucide-svelte';

	import { onMount, onDestroy } from 'svelte';
	import { enhance } from '$app/forms';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';
	import Placeholder from '@tiptap/extension-placeholder';

	let element: HTMLDivElement | null;
	let editor;
	let form;
	let html = '';

	export let url: string;

	onMount(() => {
		console.time('loadEditor');
		editor = new Editor({
			element,
			extensions: [
				StarterKit,
				Placeholder.configure({
					placeholder: "What's on your mind?",
					emptyNodeClass:
						'first:before:h-0 first:before:text-gray-400 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none'
				})
			],
			editorProps: {
				attributes: {
					class:
						'prose dark:prose-invert prose-sm max-w-none sm:prose-base m-3 leading-none focus:outline-none'
				}
			},
			content: '',
			onTransaction: () => {
				editor = editor;
				html = editor?.getHTML();
			}
		});
		console.timeEnd('loadEditor');
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div class="rounded-lg flex flex-col gap-2 border border-surface-500 p-4">
	{#if editor}
		<header class="flex gap-2 items-center">
			<div class="flex bg-surface-500 border-surface-700 rounded-lg">
				<button
					on:click={() => editor.chain().focus().toggleBold().run()}
					class="btn-icon {editor.isActive('bold') ? 'variant-filled-secondary' : ''}"
					aria-label="Bold"
				>
					<BoldIcon />
				</button>
				<button
					on:click={() => editor.chain().focus().toggleItalic().run()}
					class="btn-icon {editor.isActive('italic') ? 'variant-filled-secondary' : ''}"
					aria-label="Italic"
				>
					<ItalicIcon />
				</button>
				<button
					on:click={() => editor.chain().focus().toggleStrike().run()}
					class="btn-icon {editor.isActive('strike') ? 'variant-filled-secondary' : ''}"
					aria-label="Strikethrough"
				>
					<StrikethroughIcon />
				</button>
			</div>
			<button class="btn variant-filled-secondary ml-auto mr-2" on:click={() => form.submit()}
				>Post</button
			>
		</header>
	{/if}
	<div bind:this={element} class="border-[1px] border-surface-500 rounded-lg" />
	<form bind:this={form} method="POST" action={`?/add`} enctype="multipart/form-data" use:enhance>
		<input type="hidden" name="url" value={url} />
		<input type="hidden" name="content" bind:value={html} />
	</form>
</div>

<style>
	:global(.tiptap p) {
		margin-top: 0.1rem !important;
		margin-bottom: 0.7rem !important;
		@apply leading-relaxed;
	}
</style>
