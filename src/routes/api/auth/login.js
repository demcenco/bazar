import db from '$lib/db';
import bcryptjs from 'bcryptjs';
import { serialize, parse } from 'cookie';
import jwt from 'jsonwebtoken';

let mi_secreto = 'ElBenjaSeLaComeConLosPlatosRotos420_no_scope';

// // Deserializo los datos que trae el formulario

// let cookies = await parse(request.headers.get('cookie'))

// let verify = await jwt.verify(cookies.session_bazar, mi_secreto)
// console.log(verify);

export async function post({ request }) {
	let data = await request.json();

	let { rows } = await db.query('SELECT * FROM "users" WHERE "rut" = $1 OR "email" = $1', [
		data.username
	]);

	if (!rows.length) {
		return { status: 400, body: { errors: ['El usuario no existe'] } };
	}
	let valid_password = await bcryptjs.compareSync(data.password, rows[0].password);
	if (!valid_password) {
		return { status: 400, body: { errors: ['La clave es incorrecta'] } };
	}

	let user = {
		user_id: rows[0].user_id,
		username: rows[0].username,
		user_type: rows[0].user_type
	};
	const token = await jwt.sign(user, mi_secreto);
	return {
		headers: {
			'Set-Cookie': serialize('session_bazar', token, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 * 1 // one week
			})
		},
		body: { user }
	};
}
