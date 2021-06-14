import { usePostDataAuth } from   '../hooks/usePostData';
import { LoadingBox } from './MiscControls';
import SignPetitionForm from './SignPetitionForm';

const SignPetitionSection = ({ petition, onConfirm }) => {    
    const { post:postSignature, confirmMessage, loading, error, errorMessage } = usePostDataAuth({ 
        url:'/api/signatures', 
        onConfirm:onConfirm,
        confirmText:'Submitted Signature'
    });

    return (
        <section className='users_list_item test_signature_user_box'>
            <SignPetitionForm onSubmit={postSignature} petition={petition} />
            {confirmMessage && <p>{confirmMessage}</p>}
            <LoadingBox loading={loading} error={error} errorMessage={errorMessage}/>
        </section>
    );
}

export default SignPetitionSection