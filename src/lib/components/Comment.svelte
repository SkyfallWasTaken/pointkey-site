<script lang="ts">
	import { type Comment as PkComment } from '$lib/schema';
	import { Avatar, type PopupSettings, popup } from '@skeletonlabs/skeleton'; // Import the 'popup' directive
	import { intlFormatDistance, format } from 'date-fns';

	export let comment: typeof PkComment;

	const commentTs = new Date(Number(comment.timestamp) * 1000);
	const currentTs = new Date();
	const relativeDate = intlFormatDistance(commentTs, currentTs);
	const formattedDate = format(commentTs, "EEEE, d MMMM yyyy 'at' h:mma");

	const hoverId = Math.random(); // Needed because otherwise the popup content is the same for all of them :/
	const datePopupHover: PopupSettings = {
		event: 'hover',
		target: `datePopupHover-${hoverId}`,
		placement: 'top'
	};
</script>

<div class="space-y-2 w-full">
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
					data-popup={`datePopupHover-${hoverId}`}
				>
					<p>{formattedDate}</p>
				</div>
			</div>
		</div>
	</header>
	<p>{@html comment.content}</p>
</div>
