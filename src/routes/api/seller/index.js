import db from '$lib/db';

export async function get({ request, locals }) {
	let { rows } = await db.query(
		`
 SELECT     *
 FROM       "shift"
 WHERE      is_active = true
    `
	);
	return { body: { shift: rows } };
}
