import PhonebookItem from "./PhonebookItem"
import { useQuery, useMutation } from '@apollo/client';
import { GET_CONTACTS, DELETE_CONTACT } from "./grapqhl/gql";
import { Loading, Alert } from "./Util";

export default function PhonebookList() {

    const { loading, error, data } = useQuery(GET_CONTACTS);
    

    if (loading) return (
        <Loading />
    );
    if (error) return (
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
                    {data.getContacts.map((item, index) => (
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