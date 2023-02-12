import { useState, useContext, Fragment } from "react";
import { ParamsContext } from "./Phonebookbox"

export default function PhonebookForm(props) {
    const { params, setParams } = useContext(ParamsContext);
    const [contact, setContact] = useState({
        name: "",
        phone: "",
    });

    const handleOnReset = () => {
        setContact({
            name: "",
            phone: "",
        });
        setParams({
            page: 1,
            pages: 1,
            name: "",
            phone: "",
        })
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setContact({
            ...contact,
            [name]: value,
        });
    };

    const handleOnSearchSubmit = (event) => {
        event.preventDefault();
        console.log(contact.name, contact.phone)
        if (contact.name === "" && contact.phone === "") {
            return event.preventDefault();
        }
        setParams({
            ...params,
            page: 1,
            name: contact.name,
            phone: contact.phone,
        })
    };

    return (
        <Fragment>
            <form onSubmit={handleOnSearchSubmit}>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card">
                            <div className="card-header">
                                <h6>Search Form</h6>
                            </div>
                            <div className="card-body">
                                <div className='row justify-content-around'>
                                    <div className='col-4'>
                                        <div className="mb-3 row">
                                            <label htlmfor="name" className="col-sm-2 col-form-label">Name</label>
                                            <div className="col-sm-10">
                                                <input type="text"
                                                    className="form-control"
                                                    name='name'
                                                    onChange={handleInputChange}
                                                    value={contact.name} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-4'>
                                        <div className="mb-3 row">
                                            <label htlmfor="phone" className="col-sm-2 col-form-label">Phone</label>
                                            <div className="col-sm-10">
                                                <input type="number"
                                                    className="form-control"
                                                    name='phone'
                                                    onChange={handleInputChange}
                                                    value={contact.phone} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-1'>
                                        <div className="mb-3 row">
                                            <button type="submit" className="btn btn-primary">
                                                <span>Search</span>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='col-1'>
                                        <div className="mb-3 row">
                                            <button type="button" onClick={handleOnReset} className="btn btn-warning">
                                                <span>Cencel</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </Fragment>
    )
}
