import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import { IoIosPeople } from 'react-icons/io'

import './styles.css'

interface LoginSessionResponse {
    idRestaurant: string
}

interface TableResponse {
    idTable: string,
    name: string,
    status: string,
    maxPeople: string
}

interface QueueResponse {
    idQueue: string,
    idRestaurant: string,
    idCustomer: string,
    numberPeople: string,
    status: string,
    regTime: string
}

interface CustomerResponse {
    idCustomer: string,
    name: string
}

interface htmlEvent {
    target: {
        id:string
    }
}


const ControlPanel = () => {

    const [tables, setTables] = useState<TableResponse[]>([])
    const [customers, setCustomers] = useState<CustomerResponse[]>([])
    const [queues, setQueues] = useState<QueueResponse[]>([])
    const [loginSession, setLoginSession] = useState<LoginSessionResponse>()

    useEffect(() => {
        const loginSessionString:string = localStorage.getItem('loginSession') || '{}'
        setLoginSession(JSON.parse(loginSessionString))


    }, [])
    
    
    useEffect(() => {
        getAllTables()
        getQueues()
        getCustomers()
    }, [loginSession])

    async function getAllTables(){
        const tables = await api.get<TableResponse[]>(`/tables?idRestaurant=${ loginSession?.idRestaurant }`)
        setTables(tables.data)
    }

    async function getQueues(){
        const queues = await api.get<QueueResponse[]>(`/queues?idRestaurant=${ loginSession?.idRestaurant }`)
        setQueues(queues.data)
    }

    async function getCustomers(){
        const customers = await api.get<CustomerResponse[]>(`/customers`)
        setCustomers(customers.data)
    }

    async function handleTableStatusChange(event:htmlEvent){
        const idTable = event.target.id

        const table = tables.find(table => table.idTable == idTable) || {status:''}
        
        const tableStatus = {
            status: table.status == 'B' ? 'F' : 'B'
        }
        
        const response = await api.put(`/tables/${ idTable }`, tableStatus)

        getAllTables()
    }

    return (
        <div id="content">
            <div id="statusBoard">
                {
                    queues.map(queue => (
                        <div key={`key_${queue.idQueue}`}>
                            <h5>{customers.find(cust => cust.idCustomer == queue.idCustomer)?.name}</h5>
                            <p>
                                <span>
                                    Reserva para {queue.numberPeople}, {queue.status == 'W' ? 'Na Fila' : 'A Caminho'}
                                </span>
                                <span>
                                    {queue.regTime}                                
                                </span>  
                            </p>
                        </div>
                    ))
                }
            </div>
            <div id="tablesBoard">                
                {
                    tables.map(table => (
                        < div key={`key_${table.idTable}`}>  
                            <input 
                                type="checkbox"
                                name={table.idTable} 
                                id={table.idTable} 
                                defaultChecked={table.status == 'B'}
                                onChange={handleTableStatusChange}

                            />
                            <label htmlFor={table.idTable} >
                                {table.name}
                                <span>
                                    <IoIosPeople />
                                    {table.maxPeople}
                                </span>
                            </label>
                        </div>
                    ))
                } 
            </div>
        </div>
    )
}

export default ControlPanel;