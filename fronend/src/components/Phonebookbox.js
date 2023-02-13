import PhonebookForm from './PhonebookForm'
import PhonebookList from './PhonebookList'
import Phonebookseach from './Phonebookseach'
import { createContext, useState } from 'react'
export const ParamsContext = createContext()

export default function Phonebook(props) {
    const [params, setParams] = useState({
        page: 1,
        pages: 1,
        name: '',
        phone: ''
    })

    const [add, setAdd] = useState({
        isAdd: false
    });

    const handleAdd = () => {
        setAdd({
            isAdd: true
        })
    }

    const handleCenceladd = () => {
        setAdd({
            isAdd: false
        })
    }

    return (
        <div className="container-md" >
            <div className="row">
                <div className="col">
                    <div className="card">
                        <div className="card-header">
                            <h1 className="text-center">Phonebook Book Apps</h1>
                        </div>
                    </div>
                </div>
            </div>
            <br />
            <ParamsContext.Provider value={{ params, setParams }}>
                <div className='row'>
                    <div className='col'>
                        <button type="button" className='btn btn-primary' onClick={handleAdd}>
                            <span>add</span>
                        </button>
                    </div>
                </div>
                <br />
                <div className='row'>
                    <div className='col'>
                        {add.isAdd ? <PhonebookForm cencelAdd={handleCenceladd} /> : false}
                    </div>
                </div>
                <br></br>
                <div className="row">
                    <Phonebookseach />
                </div >
                <br></br>
                <div className="row">
                    <div className='col'>
                        <PhonebookList />
                    </div>
                </div>
                <div className='col'>
                </div>
            </ParamsContext.Provider>
        </div >
    )
}