<script>
	import { session } from '$app/stores';
	import { post } from '$lib/api';
	import { goto } from '$app/navigation';
	let user = {
		name: 'Ostap',
		second_name: 'Demcenco',
		email: 'ostap.dem@inacapmail.cl',
		rut: '11.111.111-1',
		password: '123123',
		repeat_password: '123123'
	};
	let errors = null;
	async function submit(event) {
		for await (const [name, value] of Object.entries(user)) {
			if (!value) {
				errors = ['Debes completar todos los campos'];
				return;
			}
		}
		const response = await post(`auth/register`, { user });
		if (response.errors) {
			errors = response.errors;
		}
	}
</script>

<div class="max-w-xs m-auto w-full bg-base-200 p-2 md:p-6 rounded-xl">
	<form on:submit|preventDefault={submit}>
		<div class=" flex flex-col gap-2 ">
			<div class="text-center font-bold  text-xl">Registro</div>
			{#if errors}
				{#each errors as item}
					<div class="text-red-600">
						- {item}
					</div>
				{/each}
				<!-- content here -->
			{/if}
			<div class="w-full">
				<div class="text-xs font-semibold ">Nombre</div>
				<input bind:value={user.name} type="text" class="input input-sm input-bordered  w-full " />
			</div>
			<div class="w-full">
				<div class="text-xs font-semibold ">Apellido</div>
				<input
					bind:value={user.second_name}
					type="text"
					class="input input-sm input-bordered  w-full "
				/>
			</div>
			<div class="w-full">
				<div class="text-xs font-semibold ">Correo electronico</div>
				<input bind:value={user.email} type="text" class="input input-sm input-bordered  w-full " />
			</div>
			<div class="w-full">
				<div class="text-xs font-semibold ">RUT</div>
				<input bind:value={user.rut} type="text" class="input input-sm input-bordered  w-full " />
			</div>
			<div class="w-full">
				<div class="text-xs font-semibold ">Clave</div>
				<input
					bind:value={user.password}
					type="text"
					class="input input-sm input-bordered  w-full "
				/>
			</div>
			<div class="w-full">
				<div class="text-xs font-semibold ">Repetir Clave</div>
				<input
					bind:value={user.repeat_password}
					type="text"
					class="input input-sm input-bordered  w-full "
				/>
			</div>
			<button class="btn btn-accent btn-block rounded-full mt-2" on:click={() => {}}
				>Registrarse</button
			>
		</div>
	</form>
</div>
