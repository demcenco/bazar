<script>
	import { session } from '$app/stores';
	import { post } from '$lib/api';

	async function logOut() {
		await post('auth/logout');
		$session.user = null;
	}
</script>

<div class="navbar bg-base-300">
	<div class="flex-1">
		<label for="my-drawer-2" class=" btn btn-ghost drawer-button lg:hidden">
			<svg
				width="20"
				height="20"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				class="inline-block h-5 w-5 stroke-current md:h-6 md:w-6 "
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M4 6h16M4 12h16M4 18h16"
				/></svg
			>
		</label>
	</div>
	<div class="flex-none">
		<ul class="menu menu-horizontal p-0" />
		<a href="/todo" class="btn btn-ghost normal-case text-xl">todo</a>

		<button on:click={logOut} class="btn btn-primary"> Salir </button>
	</div>
</div>
