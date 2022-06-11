<script>
	import { session } from '$app/stores';
</script>

{#if $session.user}
	<!-- content here -->
	{#if $session.user.user_type == 2}
		<!-- content here -->
		<ul class="menu p-4 overflow-y-auto w-60 bg-base-300 text-base-content">
			<!-- Sidebar content here -->
			<li><a href="/seller">Inicio</a></li>
			<li><a href="/seller/sale">Ventas</a></li>
			<li><a href="/seller/log">Historial</a></li>
		</ul>
	{/if}
	{#if $session.user.user_type == 1}
		<ul class="menu p-4 overflow-y-auto w-60 bg-base-300 text-base-content">
			<!-- Sidebar content here -->
			<li><a href="/admin">Inicio</a></li>
		</ul>
	{/if}
{/if}
