export const load = ({ params }) => {
	return {
		url: decodeURIComponent(params.url)
	};
};
