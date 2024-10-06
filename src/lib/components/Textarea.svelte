<script lang="ts">
	import { BoldIcon, ItalicIcon, UnderlineIcon, StrikethroughIcon } from 'lucide-svelte';

	import { onMount, onDestroy } from 'svelte';
	import { Editor } from '@tiptap/core';
	import StarterKit from '@tiptap/starter-kit';

	let element: HTMLDivElement | null;
	let editor;

	onMount(() => {
		editor = new Editor({
			element,
			extensions: [StarterKit],
			editorProps: {
				attributes: {
					class: 'prose dark:prose-invert prose-sm max-w-none sm:prose-base m-3 focus:outline-none'
				}
			},
			content: ''
		});
	});

	onDestroy(() => {
		if (editor) {
			editor.destroy();
		}
	});
</script>

<div class="rounded-lg flex flex-col gap-2 border border-surface-500 p-4">
	<header class="flex gap-2 items-center">
		<div class="flex bg-surface-500 border-surface-700 rounded-lg">
			<button class="btn-icon" aria-label="Bold"><BoldIcon /></button>
			<button class="btn-icon" aria-label="Italic"><ItalicIcon /></button>
			<button class="btn-icon" aria-label="Underline"><UnderlineIcon /></button>
			<button class="btn-icon" aria-label="Strikethrough"><StrikethroughIcon /></button>
		</div>
		<button class="btn variant-filled-secondary ml-auto mr-2">Post</button>
	</header>
	<div bind:this={element} class="border-[1px] !text-surface-200 border-surface-500 rounded-lg" />
</div>
