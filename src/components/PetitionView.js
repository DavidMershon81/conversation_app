import { useLocation } from 'react-router-dom';
import useFetchDataAuth from  '../hooks/useFetchDataAuth'
import { LoadingBox } from './MiscControls';
import AddTestSignatureForm from './AddTestSignatureForm';
import { useRef } from 'react';

const TestSignatureUsers = ({ petition, onSignatureSubmit }) => {
    const getUsersParams = useRef(petition ? { petition_group_id : petition['petition_group_id'] } : {});
    const { data:users, loading, error, errorMessage } = useFetchDataAuth({ 
        url:'/api/users', 
        getRequestParams:getUsersParams.current
    });

    return (
        <section>
            <LoadingBox loading={loading} error={error} errorMessage={errorMessage} />
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

const SignaturesList = ({ petition }) => {
    const getSignatureParams = useRef({ petition_id : petition['id'] });
    const { data:sigData, addData:addSignature, loading, error, errorMessage } = useFetchDataAuth({ 
        url:'/api/signatures', 
        getRequestParams:getSignatureParams.current
    });

    const onSignatureSubmit = (data) => {
        addSignature(data);
    }
    
    if(sigData) {
        console.log(sigData);
    }

    return (
        <section>
            <LoadingBox loading={loading} error={error} errorMessage={errorMessage}/>
            { sigData && <>
                <h4>Revealed Signatures</h4>
                <ul className='test_signature_user_group'>
                { sigData.revealed_signatures.length < 1 && <li>Nobody has signed this petition.</li>}
                
                { sigData.revealed_signatures.length > 0 && sigData.revealed_signatures.map((rs,index) => 
                <li key={index} className='users_list_item test_signature_user_box'>
                    {rs}
                </li>)}

                </ul>
                <TestSignatureUsers petition={petition} onSignatureSubmit={onSignatureSubmit} />
            </>}
        </section>
    );
}

const PetitionView = ({ basePath }) => {
    const location = useLocation();
    const petitionId = location.pathname.replace(basePath, '');
    const { data:petition, loading, error, errorMessage } = useFetchDataAuth({ url:`/api/petitions/${petitionId}`});

    return (
        <section>
            <LoadingBox loading={loading} error={error} errorMessage={errorMessage}/>
            {petition && <>
                <h2>Petition: {petition['subject']}</h2>
                <p>Petition Text: {petition['petition_text']}</p>
                <SignaturesList petition={petition}/>          
            </>}
        </section>
    );
}

export default PetitionView;