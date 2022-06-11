<script context="module">
	export async function load({ session }) {
		if (session.user) {
			if (session.user.user_type == 2) {
				return {
					status: 302,
					redirect: '/seller'
				};
			}
			if (session.user.user_type == 1) {
				return {
					status: 302,
					redirect: '/admin'
				};
			}
		}
		return {};
	}
</script>

<script>
	import '../app.css';
	import NavBarNoAuth from '$lib/components/_NavBarNoAuth.svelte';
</script>

<div class="flex flex-col h-screen bg-base-100">
	<NavBarNoAuth />
	<div class="flex flex-col flex-auto bg-base-300 p-6">
		<slot />
	</div>
</div>
