import { useLocation } from 'react-router-dom';
import useFetchDataAuth from  '../hooks/useFetchDataAuth'
import usePostDataAuth from   '../hooks/usePostDataAuth'
import { LoadingBox } from './MiscControls';
import AddTestSignatureForm from './AddTestSignatureForm';
import { useRef, useState } from 'react';

const TestSignatureUsers = ({ petition, onConfirm }) => {
    //const getUsersParams = useRef(petition ? { petition_group_id : petition['petition_group_id'] } : {});
    const { data:users, loading, error, errorMessage } = useFetchDataAuth({ 
        url:'/api/users'//, 
        //getRequestParams:getUsersParams.current
    });

    return (
        <section>
            <LoadingBox loading={loading} error={error} errorMessage={errorMessage} />
            { users && <>
                <h4>Users Who Can Sign</h4>
                <ul className='test_signature_user_group'>
                { users && users.map((user) => 
                    <DebugSignPetitionAsUserForm key={user['id']} petition={petition} user={user} onConfirm={onConfirm} />
                )}
                { users && users.length < 1 && <li>No users can sign this petition.</li>}
                </ul>
            </>}
        </section>
    );
}

const DebugSignPetitionAsUserForm = ({ petition, user, onConfirm }) => {
    const { postData:signPetition, loading, error, errorMessage } = usePostDataAuth({ url:'/api/signatures', });
    const [confirmMessage, setConfirmMessage] = useState("");

    const onSubmit = (formData) =>
    {
        console.log(formData);
        setConfirmMessage("");
        signPetition(formData, () => {
            setConfirmMessage("signature submitted!");
            onConfirm();
        });
    }

    return (
        <li className='users_list_item test_signature_user_box'>
            <p>id:{user['id']} | {user['email']} | {user['first_name']} {user['last_name']}</p>
            <AddTestSignatureForm onSubmit={onSubmit} petition={petition} user={user}/>
            {confirmMessage && <p>{confirmMessage}</p>}
            <LoadingBox loading={loading} error={error} errorMessage={errorMessage}/>
        </li>
    );
}

const SignaturesList = ({ petition }) => {
    const getSignatureParams = useRef({ petition_id : petition['id'] });
    const { data:sigData, getData:getSignatures, loading, error, errorMessage } = useFetchDataAuth({ 
        url:'/api/signatures', 
        getRequestParams:getSignatureParams.current
    });
    
    if(sigData) {
        console.log(sigData);
    }

    return (
        <section>
            <LoadingBox loading={loading} error={error} errorMessage={errorMessage}/>
            { sigData && <>
                <h4>Revealed Signatures</h4>
                <ul className='test_signature_user_group'>
                { sigData.revealed_signatures.length < 1 && <li>No signatures have been revealed</li>}
                { sigData.revealed_signatures.length > 0 && sigData.revealed_signatures.map((rs,index) => 
                <li key={index} className='users_list_item test_signature_user_box'>
                    {rs}
                </li>)}

                </ul>
                <h4>Unrevealed Signatures</h4>
                <ul className='test_signature_user_group'>
                { sigData.unrevealed_signatures.length < 1 && <li>There are no unrevealed signatures</li>}
                { sigData.unrevealed_signatures.length > 0 && sigData.unrevealed_signatures.map((us,index) => 
                <li key={index} className='users_list_item test_signature_user_box'>
                    There are {us['signatures']} unrevealed signatures at threshold {us['reveal_threshold']}
                </li>)}

                </ul>
                <TestSignatureUsers petition={petition} onConfirm={getSignatures} />
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