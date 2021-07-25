import usePostData from '../hooks/usePostData';
import AddPetitionGroupForm from './AddPetitionGroupForm';
import { LoadingBox } from './MiscControls';
import { Redirect, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../contexts/AppContext';

const AddPetitionGroupView = () => {
    const { loggedIn } = useContext(AppContext);
    const history = useHistory();
    const onConfirmAddGroup = (responseData) => {
        history.push(`/petition_group/${responseData.id}`)
    }
    const { post:postGroup, confirmMessage, loading, error, errorMessage } = usePostData({ 
        url:'/api/petition_groups', 
        confirmText:'Added Petition Group',
        onConfirm:onConfirmAddGroup
    });

    if(!loggedIn) {
        return <Redirect to='/login' />
    }
    return (
        <section>
            <h2>Add Petition Group</h2>
            <p>Use this form to add a new petition group.</p>
            <AddPetitionGroupForm onSubmit={postGroup}/>
            {confirmMessage && <p>{confirmMessage}</p>}
            <LoadingBox loading={loading} error={error} errorMessage={errorMessage} />
        </section>
    );
}

export default AddPetitionGroupView
