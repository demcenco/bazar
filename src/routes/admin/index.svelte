<script context="module">
	export async function load({ fetch }) {
		let res = await fetch('/api/admin');
		let { shift } = await res.json();

		return { props: { shift } };
	}
</script>

<script>
	import { post, put } from '$lib/api';

	import dayjs from 'dayjs';
	export let shift;
	console.log(shift);

	async function closeShift(shift_id) {
		let data = await put('admin/shift', { shift_id });
		console.log(data);
	}
	async function startShift() {
		let data = await post('admin/shift');
		console.log(data);
	}
</script>

<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
	<div class=" bg-base-300  rounded-xl p-8">
		{#if shift.length}
			<div class="flex flex-col  gap-5 justify-center items-center">
				<div class="text-2xl font-semibold text-teal-600">
					Turno Activo #{shift[0].shift_id}
				</div>
				<div class="text-lg font-semibold">
					Inicio: {dayjs(shift[0].started_at).format('YYYY-MM-DD HH:mm:ss')}
				</div>
				<div>
					<button
						class="btn btn-warning"
						on:click={() => {
							closeShift(shift[0].shift_id);
						}}
					>
						Cerrar Turno
					</button>
				</div>
			</div>
		{/if}
		{#if !shift.length}
			<div class="flex flex-col  gap-5 justify-center items-center">
				<div class="text-2xl font-semibold text-rose-600">No hay turnos activos</div>

				<div>
					<button
						class="btn btn-primary"
						on:click={() => {
							startShift();
						}}
					>
						Iniciar Turno
					</button>
				</div>
			</div>
		{/if}
	</div>

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
