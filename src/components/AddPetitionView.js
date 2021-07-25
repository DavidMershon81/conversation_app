import usePostData from   '../hooks/usePostData';
import AddPetitionForm from './AddPetitionForm';
import { LoadingBox } from './MiscControls';
import { useLocation, Redirect } from 'react-router-dom';
import { useContext } from 'react'
import { AppContext } from '../contexts/AppContext';

const AddPetitionView = ({ basePath }) => {
    const { loggedIn } = useContext(AppContext);
    const location = useLocation();
    const petitionGroupId = location.pathname.replace(basePath, '');
    const { post:postPetition, confirmMessage, loading, error, errorMessage } = usePostData({ 
        url:'/api/petitions', 
        confirmText:'Added New Petition'
    });

    if(!loggedIn) {
        return <Redirect to='/login' />
    }
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
