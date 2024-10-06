<script lang="ts">
	import { type Comment as PkComment } from '$lib/schema';
	import { Avatar, type PopupSettings, popup } from '@skeletonlabs/skeleton'; // Import the 'popup' directive
	import { intlFormatDistance, format } from 'date-fns';

	export let comment: typeof PkComment;
	const relativeDate = intlFormatDistance(new Date(comment.timestamp), new Date());
	const formattedDate = format(new Date(comment.timestamp), "EEEE, d MMMM yyyy 'at' h:mma");

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
	<p>{comment.content}</p>
</div>
