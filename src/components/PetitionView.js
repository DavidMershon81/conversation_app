import { useLocation } from 'react-router-dom';
import useFetchData from  '../hooks/useFetchData'
import { LoadingBox } from './MiscControls';
import AddTestSignatureForm from './AddTestSignatureForm';
import { useRef } from 'react';

const TestSignaturesView = ({ petition }) => {
    const getRequestParams = useRef({ petition_group_id : petition['petition_group_id'] });
    const { data:users, addData:addUser, loading, error } = useFetchData({ 
        getUrl:'/api/users', getRequestParams:getRequestParams.current 
    });

    const onSignatureSubmit = (data) => {
        console.log(data);
    }

    return (
        <section>
            <LoadingBox loading={loading} error={error} />
            { users && <>
                <h4>Users Who Can Sign</h4>
                <ul className='test_signature_user_group'>
                { users && users.map((user) => 
                    <li key={user['id']} className='users_list_item test_signature_user_box'>
                        <p>id:{user['id']} | {user['email']} | {user['first_name']} {user['last_name']}</p>
                        <AddTestSignatureForm onSubmit={onSignatureSubmit} petition={petition} user={user}/>
                    </li>
                )}
                { users && users.length < 1 && <li>No users can sign this petition.</li>}
                </ul>
            </>}
        </section>
    );
}

const PetitionView = ({ basePath }) => {
    const location = useLocation();
    const petitionId = location.pathname.replace(basePath, '');
    const { data:petition, loading, error } = useFetchData({ getUrl:`/api/petitions/${petitionId}` });

    return (
        <section>
            <LoadingBox loading={loading} error={error} />
            {petition && <>
                <h2>Petition: {petition['subject']}</h2>
                <p>Petition Text: {petition['petition_text']}</p>
                <TestSignaturesView petition={petition} />
            </>}
        </section>
    );
}

export default PetitionView;