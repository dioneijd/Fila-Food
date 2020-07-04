import { Request, Response } from 'express'
import knex from '../database/connection'

class TablesController {
    async index(request: Request, response: Response) {
        const { idRestaurant, maxPeople } = request.query        
        
        const tables = await knex('TABLES').where(builder => {
            if (idRestaurant) builder.where('idRestaurant', String(idRestaurant))
            if (maxPeople) builder.where('maxPeople', String(maxPeople))
        })
        
        return response.json(tables)
    }

    async show(request: Request, response: Response) {
        const { id } = request.params
        const table = await knex('TABLES').where('idTable', id).first()
        
        return response.json(table)
    }
    
    async store(request: Request, response: Response) {        
        const trx = await knex.transaction()
        const { idRestaurant, maxPeople, name } = request.body
        
        const table = {
            idRestaurant, 
            maxPeople, 
            name
        }
    
        const insertedIds = await trx('TABLES').insert(table)
        const ret = {idTable: insertedIds[0], ...table}

        await trx.commit()
    
        return response.json(ret)

    }
    async update(request: Request, response: Response) {
        const { id } = request.params
        const queue = request.body

        const ret = await knex('QUEUES').where('idQueue', id).update(queue)  
        
        return response.json(ret)
    }
    
    async destroy(request: Request, response: Response) {
        const { id } = request.params
        const queue = await knex('QUEUES').where('idQueue', id).delete()
        return response.json(queue)
    }
 
}

export default TablesController