<script context="module">
	import { goto } from '$app/navigation';
	export async function load({ fetch, url }) {
		let pagination = {
			page: url.searchParams.get('page') ? url.searchParams.get('page') : 1,
			per_page: url.searchParams.get('per_page') ? url.searchParams.get('per_page') : 15
		};
		let search = new URLSearchParams(pagination).toString();

		const res = await fetch(`/api/seller/sale?${search}`);
		let data = await res.json();

		return {
			props: { data, pagination }
		};
	}
</script>

<script>
	import { get } from '$lib/api';

	import dayjs from 'dayjs';
	export let data;
	export let pagination;

	let total_items = data.total;

	async function changePage(page) {
		pagination.page = page;
		let search = new URLSearchParams(pagination).toString();
		let res = await get(`seller/sale?${search}`);
		data = res;
		total_items = res.total;
	}
</script>

<div class=" flex  items-center justify-center ">
	<div class="overflow-x-auto w-full max-w-5xl  ">
		<table class="table table-compact w-full ">
			<thead>
				<tr>
					<th>#</th>
					<th>Fecha Creacion</th>
					<th>Turno</th>
					<th>Estado</th>
				</tr>
			</thead>
			<tbody>
				{#each data.orders as item}
					<!-- content here -->
					<tr>
						<td>{item.order_id}</td>
						<td> {dayjs(item.created_at).format('YYYY-MM-DD HH:mm:ss')}</td>
						<td>{item.shift_id}</td>
						<td>
							<div
								class="badge "
								class:badge-primary={item.completed}
								class:badge-accent={!item.completed}
							>
								{item.completed ? 'Cerrada' : 'Abierta'}
							</div></td
						>
						<td>
							<button
								on:click={() => goto(`/seller/sale/${item.order_id}`)}
								class="btn btn-xs btn-secondary"
							>
								Ver
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
		<div class="flex items-center justify-center m-4">
			<div class="btn-group">
				{#if pagination.page > 1}
					<button
						class="btn btn-sm"
						on:click={() => {
							changePage(Number(pagination.page) - 1);
						}}>«</button
					>
					<button
						class="btn btn-sm"
						on:click={() => {
							changePage(Number(pagination.page) - 1);
						}}
					>
						{Number(pagination.page) - 1}</button
					>
				{/if}

				<button class="btn btn-sm btn-active"> {pagination.page}</button>
				{#if total_items - pagination.per_page * pagination.page > 0}
					<!-- content here -->
					<button
						class="btn btn-sm"
						on:click={() => {
							changePage(Number(pagination.page) + 1);
						}}
					>
						{Number(pagination.page) + 1}</button
					>
					<button
						class="btn btn-sm"
						on:click={() => {
							changePage(Number(pagination.page) + 1);
						}}>»</button
					>
				{/if}
			</div>
		</div>
	</div>

	<style>
		th {
			@apply bg-base-300;
		}
	</style>
</div>
