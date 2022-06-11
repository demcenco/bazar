<script context="module">
	export async function load({ fetch }) {
		let res = await fetch('/api/seller');
		let { shift } = await res.json();

		return { props: { shift } };
	}
</script>

<script>
	import { goto } from '$app/navigation';
	import { post } from '$lib/api';
	export let shift;

	async function startSale() {
		const { order_id } = await post('seller/sale');
		console.log(order_id);
		goto(`/seller/sale/${order_id}`);
	}
</script>

<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
	<!-- <button class="btn btn-primary h-full w-full  rounded-xl p-8 " on:click={startSale}>
		INICIAR VENTA
	</button> -->
	{#if !shift.length}
		<div class="bg-base-300 rounded-xl p-8">NO HAY TURNO ACTIVBO AAAAAAAAAAAAAAAAAAAAAAA</div>
	{/if}
	{#if shift.length}
		<label for="my-modal" class="btn btn-primary h-full w-full  rounded-xl p-8">Iniciar venta</label
		>

		<input type="checkbox" id="my-modal" class="modal-toggle" />
		<label for="my-modal" class="modal cursor-pointer">
			<label class="modal-box relative" for="">
				<button class="btn btn-primary h-full w-full  rounded-xl p-8 " on:click={startSale}>
					INICIAR VENTA
				</button>
			</label>
		</label>
	{/if}
	<!-- Put this part before </body> tag -->

	<div class="bg-base-300 rounded-xl p-8">
		<div class="flex items-start justify-between">
			<div class="text-lg font-medium tracking-tight leading-6 truncate">Ventas hoy</div>
		</div>
		<div class="flex flex-col items-center mt-2">
			<div class="text-7xl sm:text-8xl font-bold tracking-tight leading-none text-blue-500">21</div>
			<div class="text-lg font-medium text-blue-600 dark:text-blue-500">Total</div>
			<div class="flex items-baseline justify-center w-full mt-5 text-secondary">
				<div class="text-md font-medium truncate">Abiertas:</div>
				<div class="ml-1.5 text-lg font-semibold">13</div>
			</div>
		</div>
	</div>
	<div class="bg-base-300 rounded-xl p-8">HOLA</div>
	<div class="bg-base-300 rounded-xl p-8">HOLA</div>
</div>
