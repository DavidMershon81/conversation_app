import usePostDataAuth from   '../hooks/usePostDataAuth'
import { LoadingBox } from './MiscControls';
import SignPetitionForm from './SignPetitionForm';
import { useState } from 'react';

const SignPetitionSection = ({ petition, user, onConfirm }) => {
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
        <section className='users_list_item test_signature_user_box'>
            <SignPetitionForm onSubmit={onSubmit} petition={petition} />
            {confirmMessage && <p>{confirmMessage}</p>}
            <LoadingBox loading={loading} error={error} errorMessage={errorMessage}/>
        </section>
    );
}

export default SignPetitionSection