<script lang="ts">
	import { type Comment as PkComment } from '$lib/schema';
	import { Avatar, type PopupSettings, popup } from '@skeletonlabs/skeleton'; // Import the 'popup' directive
	import { intlFormatDistance, format } from 'date-fns';

	export let comment: typeof PkComment;

	const commentTs = new Date(Number(comment.timestamp) * 1000);
	const currentTs = new Date();
	console.log(comment.content, commentTs, currentTs);
	const relativeDate = intlFormatDistance(commentTs, currentTs);
	const formattedDate = format(commentTs, "EEEE, d MMMM yyyy 'at' h:mma");

	const datePopupHover: PopupSettings = {
		event: 'hover',
		target: 'datePopupHover',
		placement: 'top'
	};
</script>

<div class="p-4 variant-soft space-y-2 w-screen">
	<header class="flex gap-3 items-center">
		<Avatar src="https://i.pravatar.cc/?img=lorem" width="w-8" />
		<div class="flex gap-2 items-center">
			<p class="font-bold">{comment.authorId}</p>
			<div>
				<small class="opacity-50 [&>*]:pointer-events-none" use:popup={datePopupHover}
					>{relativeDate}</small
				>
				<div
					class="rounded-lg px-3 py-1 variant-filled-secondary shadow-sm"
					data-popup="datePopupHover"
				>
					<p>{formattedDate}</p>
				</div>
			</div>
		</div>
	</header>
	<p>{@html comment.content}</p>
</div>
