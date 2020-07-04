import { Request, Response } from 'express';
import knex from '../database/connection';

class RestaurantsController {
    /* Lista todos os restaurantes */
    async index(request: Request, response: Response) {
        const { city, uf, items } = request.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));
        
        const restaurants = await knex('restaurant')
            .join('tables', 'restaurant.res_id', '=', 'tables.res_id')
            .whereIn('table.tab_id', parsedItems)
            .where('city', String(city))
            .where('uf', String(uf))
            .distinct()
            .select('restaurant.*');
        
        return response.json({ restaurants });
    };
    /* Exibe um restaurante expecífico */
    async show(request: Request, response: Response) {
        const { id } = request.params;

        const point = await knex('restaurant').where('res_id', id).first();

        if (!point) {
            return response.status(400).json({ message: 'Restaurant not found' })
        }
        else
        {
            const items = await knex('tables')
                .join('restaurant', 'tables.res_id', '=', 'restaurant.res_id')
                .where('restaurant.res_id', id)
                .select('tables.*');
            
            return response.json({ point, items });
        }
    };
    /* Cria um restaurante */
    async create(request: Request, response: Response) {
        const {
            image,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            adress,
            city,
            uf,
            waiting_time,
        } = request.body;
    
        const trx = await knex.transaction();

        const restaurant = {
            image,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            adress,
            city,
            uf,
            waiting_time,
        };
    
        const insertedIds = await trx('restaurants').insert(restaurant);
    
        const res_id = insertedIds[0];

        await trx.commit();
    
        return response.json({
            id: res_id
        });
    };
};

export default RestaurantsController;