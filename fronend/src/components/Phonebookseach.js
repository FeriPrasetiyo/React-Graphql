import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_CONTACT, LOAD_CONTACTS } from "./grapqhl/gql";
import { Loading, Alert } from "./Util";

export default function PhonebookForm(props) {
    const [createContact, { loading, error }] = useMutation(CREATE_CONTACT, {
        refetchQueries: [
            { query: LOAD_CONTACTS }
        ],
    });

    const [contact, setContact] = useState({
        name: '',
        phone: '',
    })

    if (loading) return (
        <Loading />
    );
    if (error) return (
        <Alert messege={error} />
    )



    return (
        <form onSubmit={handleSubmit}>
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
                                            <input type="text" className="form-control" name='name' onChange={handleInputChange} value={user.name} />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-4'>
                                    <div className="mb-3 row">
                                        <label htlmfor="phone" className="col-sm-2 col-form-label">Phone</label>
                                        <div className="col-sm-10">
                                            <input type="number" className="form-control" name='phone' onChange={handleInputChange} value={user.phone} />
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
                                        <button type="button" onClick={handleCencel} className="btn btn-warning">
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
    )
}
