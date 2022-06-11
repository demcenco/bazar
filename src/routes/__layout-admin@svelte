<script context="module">
	export async function load({ session }) {
		if (!session.user) {
			return {
				status: 302,
				redirect: '/login'
			};
		}
		return {};
	}
</script>

<script>
	import SidebarLinks from '$lib/components/SideBarLinks/_SidebarLinks.svelte';
	import NavBar from '$lib/components/_NavBar.svelte';
	import '../app.css';
</script>

<div class="drawer drawer-mobile">
	<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
	<div class="drawer-content flex flex-col  h-screen overflow-x-hidden">
		<NavBar />
		<div class="flex flex-col flex-auto p-8 bg-base-200">
			<slot />
		</div>
		<div class="bg-base-300">Footer</div>
	</div>
	<div class="drawer-side bg-base-300">
		<label for="my-drawer-2" class="drawer-overlay" />

		<SidebarLinks />
	</div>
</div>
