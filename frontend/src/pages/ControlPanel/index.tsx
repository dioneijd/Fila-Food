import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'

import './styles.css'

interface LoginSessionResponse {
    idRestaurant: string
}

interface TableResponse {
    idTable: string,
    name: string,
    status: string
}

interface htmlEvent {
    target: {
        id:string
    }
}


const ControlPanel = () => {

    const [tables, setTables] = useState<TableResponse[]>([])
    const [loginSession, setLoginSession] = useState<LoginSessionResponse>()

    useEffect(() => {
        const loginSessionString:string = localStorage.getItem('loginSession') || '{}'
        setLoginSession(JSON.parse(loginSessionString))
    }, [])

    
    useEffect(() => {
        getAllTables()
    }, [loginSession])


    async function getAllTables(){
        const tables = await api.get<TableResponse[]>(`/tables?idRestaurant=${ loginSession?.idRestaurant }`)
        //console.log(tables.data)
        setTables(tables.data)
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
                <h1>STATUS BOARD</h1>
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
                            </label>
                        </div>
                    ))
                } 
            </div>
        </div>
    )
}

export default ControlPanel;