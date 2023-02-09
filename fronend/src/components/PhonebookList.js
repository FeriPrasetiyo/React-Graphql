import PhonebookItem from "./PhonebookItem"
import { useQuery } from '@apollo/client';
import { LOAD_CONTACTS } from "./grapqhl/gql";
import { Loading, Alert } from "./Util";
import { useContext, useState } from "react";
import { ParamsContext } from "./Phonebookbox"

export default function PhonebookList() {
    const [contacts, setContacts] = useState([])
    const { params, setParams } = useContext(ParamsContext)

    const { loading, error } = useQuery(LOAD_CONTACTS, {
        variables: {
            page: params.page,
            name: params.name,
            phone: params.phone,
        },
        notifyOnNetworkStatusChange: true,
        onCompleted: ({ load: { data } }) => {
            setParams({
                page: data.params.page,
                pages: data.params.pages,
                name: data.params.name ? data.params.name : params.name,
                phone: data.params.phone ? data.params.phone : params.phone,
            });
            console.log(data)
            setContacts([...(params.page === 1 ? [] : contacts), ...data.contacts]);
        },
    });
    console.log(contacts)

    const scrolling = (event) => {
        if (
            event.target.scrollHeight - event.target.scrollTop ===
            event.target.clientHeight
        ) {
            if (params.page < params.pages) {
                setParams({
                    ...params,
                    page: params.page + 1,
                });
            }
        }
    }
    if (loading) return (
        <Loading />
    );
    if (error) return (
        <Alert messege={error} />
    )

    return (
        <div className="col" onScroll={scrolling} style={{ overflowY: 'scroll', height: 200 }}>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((item, index) => (
                        <PhonebookItem
                            constacts={item}
                            key={item.id + 1}
                            no={index + 1}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}