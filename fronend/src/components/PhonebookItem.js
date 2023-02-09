import { useState } from 'react'
import { useMutation } from "@apollo/client";
import { LOAD_CONTACTS, UPDATE_CONTACT, DELETE_CONTACT } from "./grapqhl/gql";
import { Loading, Alert } from "./Util";

export default function PhonebookItem(props) {
    const [contact, setContact] = useState({
        id: props.constacts.id,
        name: props.constacts.name,
        phone: props.constacts.phone,
    })
    const [edit, setEdit] = useState(false)

    const [updateContact, { loading, error }] = useMutation(UPDATE_CONTACT, {
        refetchQueries: [{ query: LOAD_CONTACTS }],
        onCompleted: () => {
            setEdit(false)
        }
    });

    const [deleteContact, { loading: loadingDelete, error: errorDelete }] = useMutation(DELETE_CONTACT, {
        refetchQueries: [
            { query: LOAD_CONTACTS }
        ],
    });

    const handleInputChange = (event) => {
        console.log(event)
        const { name, value } = event.target;
        setContact({
            ...contact,
            [name]: value,
        });
    };

    const handleEdit = () => {
        setEdit({
            isEdit: true
        })
    }

    const handleCencel = () => {
        setContact({
            name: props.constacts.name,
            phone: props.constacts.phone,
        })
        setEdit(false)
    }

    const handleUpdateContact = () => {
        console.log(contact.id)
        const data = {
            id: contact.id,
            name: contact.name,
            phone: contact.phone,
        };
        updateContact({ variables: data });
    };

    if (loading || loadingDelete) return (
        <Loading />
    );
    if (error || errorDelete) return (
        <Alert messege={error} />
    )

    return (
        <tr>
            <td>{props.no}</td>
            <td>
                {edit ?
                    <input className='form-control'
                        type='text' name='name'
                        value={contact.name}
                        placeholder='masukan name'
                        onChange={handleInputChange} />
                    :
                    contact.name
                }
            </td>
            <td>
                {edit ?
                    <input className='form-control'
                        type='number'
                        name='phone'
                        value={contact.phone}
                        placeholder='masukan phone'
                        onChange={handleInputChange} />
                    :
                    contact.phone
                }
            </td>
            {edit ?
                <td>
                    <div className="row">
                        <div className="col-sm-5">
                            <button type="button" className="btn btn-info" onClick={handleUpdateContact}>
                                <span>Save</span>
                            </button>
                        </div>
                        <div className="col-sm-6">
                            <button className="btn btn-warning" type="button"
                                onClick={handleCencel}>
                                <span>Cencel</span>
                            </button>
                        </div>
                    </div>
                </td>
                :
                <td>
                    <div className="row">
                        <div className="col-sm-4">
                            <button type="button" className="btn btn-success" onClick={handleEdit}>
                                <span>Edit</span>
                            </button>
                        </div>
                        <div className="col-sm-5">
                            <button className="btn btn-danger" type="button"
                                onClick={props.remove}>
                                <span>Delete</span>
                            </button>
                        </div>
                    </div>
                </td>
            }
        </tr >
    )
}