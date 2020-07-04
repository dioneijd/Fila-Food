import { Request, Response } from 'express'
import knex from '../database/connection'

class RestaurantsController {
    async index(request: Request, response: Response) {
        const restaurants = await knex('RESTAURANTS')
        return response.json(restaurants)
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const restaurant = await knex('RESTAURANTS').where('idRestaurant', id).first();

        if (!restaurant) return response.status(400).json({ message: 'Restaurant not found' })
        
        return response.json(restaurant)     
    }

    async store(request: Request, response: Response) {     
        const trx = await knex.transaction()
        const { email, password, name, maxWaitTime } = request.body
        
        const restaurant = {
            email,
            password,
            name,
            maxWaitTime
        }
    
        const insertedIds = await trx('RESTAURANTS').insert(restaurant)
        const ret = {idRestaurant: insertedIds[0], ...restaurant}

        await trx.commit()
    
        return response.json(ret)
    }
    async update(request: Request, response: Response) {
        return response.status(501).json({error: 'Not Implemented'})        
    }
    async destroy(request: Request, response: Response) {
        return response.status(501).json({error: 'Not Implemented'})        
    }
}

export default RestaurantsController