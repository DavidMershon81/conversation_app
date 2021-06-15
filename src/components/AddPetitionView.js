import usePostData from   '../hooks/usePostData';
import AddPetitionForm from './AddPetitionForm';
import { LoadingBox } from './MiscControls';
import { useLocation } from 'react-router-dom';

const AddPetitionView = ({ basePath }) => {
    const location = useLocation();
    const petitionGroupId = location.pathname.replace(basePath, '');
    const { post:postPetition, confirmMessage, loading, error, errorMessage } = usePostData({ 
        url:'/api/petitions', 
        confirmText:'Added New Petition'
    });

    return (
        <section>
            <h2>Add Petition</h2>
            <p>Use this form to add a new petition.</p>
            <AddPetitionForm petitionGroupId={petitionGroupId} onSubmit={postPetition} />
            {confirmMessage && <p>{confirmMessage}</p>}
            <LoadingBox loading={loading} error={error} errorMessage={errorMessage} />
        </section>
    );
}

export default AddPetitionView
