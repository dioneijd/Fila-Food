import { Request, Response } from 'express'
import knex from '../database/connection'

class CustomersController  {
    async index(request: Request, response: Response) {
        return response.status(501).json({error: 'Not Implemented'})
    }

    async show(request: Request, response: Response) {
        const { id } = request.params;

        const customerId = await knex('CUSTOMERS').where('idCustomer', id).first();

        if (!customerId) return response.status(400).json({ message: 'Customer not found' })
        
        return response.json(customerId)        
    }
    
    async store(request: Request, response: Response) {        
        const trx = await knex.transaction()
        const { email, password, name } = request.body
        
        const customer = {
            email,
            password,
            name,
        }
    
        const insertedIds = await trx('CUSTOMERS').insert(customer)
        const ret = {idCustomer: insertedIds[0], ...customer}

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

export default CustomersController