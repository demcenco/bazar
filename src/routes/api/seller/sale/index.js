import db from '$lib/db';

export async function get({ locals, url }) {
	console.log(url);
	let { user } = locals;
	let { rows } = await db.query(
		`
		
		WITH  contar AS 
		(
			SELECT 		count(*) total
			FROM 		"order"
			WHERE 		user_id = $1 
		), obtener AS 
		(
			SELECT 		*
			FROM 		"order" a
			WHERE 		user_id = $1
			ORDER BY 	created_at
			DESC
			LIMIT $2
			OFFSET ($3 - 1) * $2
		)
		SELECT 	jsonb_agg(obtener) orders,
				total
		FROM 	contar,
				obtener
		GROUP BY total


	`,
		[user.user_id, url.searchParams.get('per_page'), url.searchParams.get('page')]
	);

	return {
		body: rows[0]
	};
}

export async function post({ locals }) {
	let { user } = locals;
	let { rows } = await db.query(
		`
    INSERT INTO "order" ("user_id","shift_id")
    SELECT      b.user_id, a.shift_id
    FROM        "shift" a
    JOIN        "users" b ON b.user_id = $1
    WHERE       a.is_active = true
    AND         b.active = true
    RETURNING   order_id
    `,
		[user.user_id]
	);
	console.log(rows);

	return {
		body: {
			order_id: rows[0].order_id
		}
	};
}
