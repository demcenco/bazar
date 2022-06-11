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
	try {
		let { user } = await request.json();

		let {
			rows: [credentials]
		} = await db.query(
			`
        SELECT  *
        FROM    users
        WHERE   email    = $1
        OR      rut      = $2
        `,
			[user.email, user.rut]
		);
		let encrypted_password = await bcryptjs.hash(user.password, 10);
		if (!credentials) {
			let rows = await db.query(
				`
            INSERT INTO users (first_name, second_name, password, email, rut)
            SELECT  $1,$2,$3,$4,$5
            `,
				[user.name, user.second_name, encrypted_password, user.email, user.rut]
			);
			console.log('registra');
		}
		return {
			body: { user: 'hola' }
		};
	} catch (error) {
		console.log(error);
		return {};
	}
}
