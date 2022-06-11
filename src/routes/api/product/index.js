import db from '$lib/db';

export async function get({ locals, url }) {
	let { user } = locals;
	let search = url.searchParams.get('search');
	console.log(user, search);
	let { rows } = await db.query(
		`
            SELECT *, 1 as amount
            FROM   product
            WHERE  SIMILARITY(name,$1) > 0.2
            OR     SIMILARITY(product_id,$1) > 0.2
            OR     SIMILARITY(description,$1) > 0.2
            OR    SIMILARITY(brand,$1) > 0.2
    `,
		[search]
	);
	console.log(rows);
	return {
		body: {
			products: rows
		}
	};
}
