import db from '$lib/db';

export async function get({ locals, params }) {
	let { user } = locals;
	console.log(params);
	console.log('asd');
	const { rows } = await db.query(
		`
		WITH productos AS (

            SELECT  array_agg(a) products
            FROM    order_product_v a
            WHERE   order_id = $2
            

        ), final AS 
        (
            SELECT  "a".*, 
                    COALESCE("b"."products", '{}') "products"
            FROM    "order" a,
                    "productos" "b"
            WHERE   "user_id" = $1
            AND     "order_id" = $2
        )
        SELECT  to_jsonb("a") as "order"
        FROM    "final" "a"
 
	`,
		[user.user_id, params.order_id]
	);

	return {
		body: {
			order: rows[0].order
		}
	};
}

export async function post({ locals, params, request }) {
	let { user } = locals;
	let { sale_type, bussiness } = await request.json();
	let { order_id } = params;
	let weas;
	if (sale_type == 'Factura') {
		let { rows } = await db.query(
			`
                WITH insertar_negocio AS 
                (
                    INSERT INTO         "bussiness_data"(name,rut,type,address)
                    SELECT              $1,$2,$3,$4
                    ON CONFLICT         (rut)
                    DO UPDATE SET       name=EXCLUDED.name 
                    RETURNING           bussiness_id
                )
                INSERT INTO "sale"(bussiness_id , order_id)
                SELECT      bussiness_id, $5
                FROM        insertar_negocio
                WHERE       NOT EXISTS 
                            (
                                SELECT  true
                                FROM    "sale"
                                WHERE   order_id = $5
                            )
                RETURNING   *

    `,
			[bussiness.name, bussiness.rut, bussiness.type, bussiness.address, order_id]
		);
		weas = rows;
	} else {
		let { rows } = await db.query(
			`

            INSERT INTO "sale"( order_id)
            SELECT       $1
            WHERE       NOT EXISTS 
            (
                SELECT  true
                FROM    "sale"
                WHERE   order_id = $1
            )
            RETURNING   *

    `,
			[order_id]
		);
		weas = rows;
	}

	return {
		body: {
			order: weas
		}
	};
}
