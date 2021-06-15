import { useLocation, Redirect } from 'react-router-dom';
import useGetData from  '../hooks/useGetData'
import { LoadingBox } from './MiscControls';
import SignPetitionSection from './SignPetitionSection';
import { useRef, useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const SignaturesList = ({ petition }) => {
    const requestParams = useRef({ petition_id : petition['id'] });
    const { data:sigData, getData:getSignatures, loading, error, errorMessage } = useGetData({ 
        url:'/api/signatures', 
        params:requestParams.current
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
                <SignPetitionSection petition={petition} onConfirm={getSignatures} />
            </>}
        </section>
    );
}

const PetitionView = ({ basePath }) => {
    const { loggedInUser } = useContext(AppContext);
    const location = useLocation();
    const petitionId = location.pathname.replace(basePath, '');
    const { data:petition, loading, error, errorMessage } = useGetData({ 
        url:`/api/petitions/${petitionId}`
    });

    if(!loggedInUser) {
        return <Redirect to='/login' />
    }
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