<script context="module">
	import { session } from '$app/stores';
	import { del, get, post, put } from '$lib/api';
	export async function load({ params, fetch }) {
		const res = await fetch(`/api/seller/sale/${params.order_id}`);
		const { order } = await res.json();

		return {
			props: {
				order
			}
		};
	}
</script>

<script>
	import dayjs from 'dayjs';
	import { page } from '$app/stores';
	import { onMount, prevent_default } from 'svelte/internal';
	let search;
	let data;
	let refresh;
	let key, keyCode;
	let sum_total;
	export let order;
	let es_factura = false;
	let bussiness = {
		name: 'HERMANOS WEONES LIMITADA MENTALMENTE',
		rut: '1.123.123-2',
		type: 'Retard Consultants',
		address: 'La colgante 3044'
	};

	async function searchProduct() {
		let { products } = await get(`product?search=${search}`);

		data = products;
	}
	async function addProduct(item) {
		let { product } = await post(`seller/sale/${$page.params.order_id}/product`, { item });
		getData();
	}
	async function updateProduct(item) {
		await put(`seller/sale/${$page.params.order_id}/product`, { item });
		getData();
	}
	async function deleteProduct(item) {
		await del(`seller/sale/${$page.params.order_id}/product?id=${item.order_product_id}`);
		getData();
	}
	async function getData() {
		let data = await get(`seller/sale/${$page.params.order_id}`);
		order = data.order;
		refresh = !refresh;
	}
	async function finishSale(sale_type) {
		console.log(bussiness);
		console.log(sale_type);
		let data = await post(`seller/sale/${$page.params.order_id}`, { sale_type, bussiness });
		console.log(data);
	}

	$: sum_total = order.products.reduce((accumulator, item) => {
		return accumulator + item.amount * item.price;
	}, 0);
</script>

<div class="flex flex-col max-w-4xl w-full mx-auto bg-base-300 rounded-xl p-14">
	<div class="flex justify-between">
		<div class="flex flex-col">
			<div class="flex  text-3xl w-72  justify-between font-semibold">
				<div class=" text-slate-400">BOLETA</div>
				<span class="text-slate-200">#{$session.user.user_id}-{order.order_id}</span>
			</div>
			<div class="flex items-center text-sm  w-72  justify-between mt-2 font-semibold">
				<div class=" text-slate-400">FECHA INICIO</div>
				<div>
					{dayjs(order.created_at).format('YYYY-MM-DD HH:mm:ss')}
				</div>
			</div>
			<div class="flex items-center text-sm   w-72  justify-between font-semibold ">
				<div class=" text-slate-400">FECHA PAGO</div>
				<div>
					PENDIENTE <!-- {dayjs(order.updated_at).format('YYYY-MM-DD HH:mm:ss')} -->
				</div>
			</div>
		</div>
		<div class="bg-slate-400  rounded-full p-6">
			<img src="/store.svg" class="" width="80" alt="" />
		</div>
	</div>

	<div class="form-control my-4 m-auto w-1/2">
		<div class="dropdown">
			<div class="input-group w-full">
				<input
					on:input={() => searchProduct()}
					bind:value={search}
					type="text"
					placeholder="Buscar Producto"
					class="input  w-full bg-base-200"
				/>
				<button tabindex="0" class="btn btn-square" on:click={searchProduct}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-6 w-6"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/></svg
					>
				</button>
			</div>

			{#if data && data.length}
				<div
					tabindex="0"
					class="dropdown-content mt-2 card rounded-t-none card-compact w-full p-2 shadow bg-base-100 text-base"
				>
					{#each data as item}
						<div
							class="flex space-x-3 p-2 border-b last:border-b-0 border-slate-400 text-sm items-center justify-evenly"
						>
							<div>
								{item.name} - {item.brand}
							</div>

							<input
								type="number"
								placeholder="Cantidad"
								class="input input-bordered input-sm w-20"
								bind:value={item.amount}
							/>

							<div>
								${item.price}
							</div>
							<button
								class="btn btn-primary btn-xs"
								on:click={() => {
									addProduct(item);
								}}
							>
								Agregar
							</button>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
	<div class="overflow-x-auto mt-10">
		<table class="table w-full table-compact ">
			<!-- head -->
			<thead class="bg-base-300">
				<tr>
					<th>ID</th>
					<th>Producto</th>
					<th>Precio</th>
					<th>Cantidad</th>
					<th>Total</th>
				</tr>
			</thead>
			<tbody>
				{#each order.products as item (item.product_id)}
					<!-- content here -->

					<tr>
						<td>{item.product_id} </td>
						<td>{item.name} </td>
						<td>{item.price}</td>

						<td>
							<input type="number" class="input input-xs" bind:value={item.amount} />
						</td>
						<td>{item.amount * item.price}</td>
						<td>
							<button class="btn btn-xs" on:click={() => updateProduct(item)}> Update </button>
							<button class="btn btn-xs" on:click={() => deleteProduct(item)}> Delete </button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<div class="p-2 font-semibold">
			<div class="flex justify-between">
				<div>TOTAL</div>
				<div>{sum_total}</div>
			</div>
		</div>
		<div class="grid grid-cols-2 gap-8  p-2 ">
			<div
				class="flex p-12 rounded bg-base-100 items-center  w-full cursor-pointer duration-200 transition-all"
				on:click={() => {
					es_factura = false;
				}}
				class:ring={!es_factura}
				class:ring-slate-600={!es_factura}
				class:bg-base-200={!es_factura}
			>
				<input type="radio" name="radio-2" class="radio radio-primary" checked={!es_factura} />
				<div class=" font-bold text-2xl text-center w-full">Boleta</div>
			</div>
			<div
				class="flex p-12 rounded bg-base-100 cursor-pointer duration-200 transition-all"
				class:ring={es_factura}
				class:ring-slate-600={es_factura}
				class:bg-base-200={es_factura}
				on:click={() => {
					es_factura = true;
				}}
			>
				<input type="radio" name="radio-2" class="radio radio-primary" checked={es_factura} />
				<div class=" font-bold text-2xl text-center w-full">Factura</div>
			</div>
		</div>
		{#if es_factura}
			<div class="flex flex-col gap-2">
				<input
					type="text"
					bind:value={bussiness.name}
					placeholder="Nombre Empresa"
					class="input w-full max-w-xs"
				/>
				<input
					type="text"
					bind:value={bussiness.rut}
					placeholder="Rut"
					class="input w-full max-w-xs"
				/>
				<input
					type="text"
					bind:value={bussiness.type}
					placeholder="Giro"
					class="input w-full max-w-xs"
				/>
				<input
					type="text"
					bind:value={bussiness.address}
					placeholder="Direccion "
					class="input w-full max-w-xs"
				/>
			</div>
			<button
				class="btn btn-primary"
				on:click={() => {
					finishSale('Factura');
				}}>Generar venta factura</button
			>
		{/if}
		{#if !es_factura}
			<button
				class="btn btn-primary"
				on:click={() => {
					finishSale('Boleta');
				}}>Generar venta boleta</button
			>
		{/if}
	</div>
</div>

<style>
	th {
		@apply bg-base-300 text-slate-400;
	}
	td {
		@apply bg-base-300  font-semibold border-b-slate-700;
	}
</style>
