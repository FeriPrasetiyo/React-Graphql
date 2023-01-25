import { useMutation } from "@apollo/client";
import { useState } from "react";
import { GET_CONTACTS, CREATE_CONTACT } from "./grapqhl/gql";
import { Loading, Alert } from "./Util";

export default function PhonebookForm(props) {
    const [createContact, { loading, error }] = useMutation(CREATE_CONTACT, {
        refetchQueries: [
            { query: GET_CONTACTS }
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
        <form onSubmit={e => {
            e.preventDefault();
            createContact({ variables: contact });
            setContact({ name: '', phone: '' })
        }}>
            <div className="row">
                <div className="col-sm-12">
                    <div className="card">
                        <div className="card-header">
                            <h6>Adding Form</h6>
                        </div>
                        <div className="card-body">
                            <div className='row justify-content-around'>
                                <div className='col-4'>
                                    <div className="mb-3 row">
                                        <label htlmfor="name" className="col-sm-2 col-form-label">Name</label>
                                        <div className="col-sm-10">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name='name'
                                                onChange={(e) => setContact({ ...contact, name: e.target.value })}
                                                value={contact.name} />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-4'>
                                    <div className="mb-3 row">
                                        <label htlmfor="phone" className="col-sm-2 col-form-label">Phone</label>
                                        <div className="col-sm-10">
                                            <input
                                                type="number"
                                                className="form-control"
                                                name='phone'
                                                onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                                                value={contact.phone} />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-1'>
                                    <div className="mb-3 row">
                                        <button type="submit" className="btn btn-success">
                                            <span>Save</span>
                                        </button>
                                    </div>
                                </div>
                                <div className='col-1'>
                                    <div className="mb-3 row">
                                        <button type="button" onClick={props.cencelAdd} className="btn btn-warning">
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