<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	console.log('Component data:', data);
</script>

<h1 class="text-3xl font-bold mb-2">{data.comments.length} comments on {data.url}</h1>
