import PhonebookItem from "./PhonebookItem"
import { useQuery, useMutation } from '@apollo/client';
import { GET_CONTACTS, DELETE_CONTACT } from "./grapqhl/gql";
import { Loading, Alert } from "./Util";

export default function PhonebookList() {

    const { loading: loadingData, error: errorData, data: list } = useQuery(GET_CONTACTS);

    const [deleteContact, { loading, error }] = useMutation(DELETE_CONTACT, {
        refetchQueries: [
            { query: GET_CONTACTS }
        ],
    });

    if (loading || loadingData) return (
        <Loading />
    );
    if (error || errorData) return (
        <Alert messege={error} />
    )

    const scrolling = (event) => {
        var element = event.target;
        if (element.scrollHeight - element.scrollTop === element.clientHeight) {
            // (loadmore())
        }
    }
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
                    {list.getContacts.map((item, index) => (
                        <PhonebookItem
                            constacts={item}
                            key={item.id + 1}
                            no={index + 1}
                            remove={() => deleteContact({ variables: { id: item.id } })}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}