import useFetchDataAuth from  '../hooks/useFetchDataAuth'
import AddPetitionGroupForm from './AddPetitionGroupForm';
import { LoadingBox } from './MiscControls';

const AddPetitionGroupView = () => {
    const { addData:addGroup, loading, error, errorMessage } = useFetchDataAuth({ url:'/api/petition_groups'});

    return (
        <section>
            <h2>Add Petition Group (user view)</h2>
            <p>Use this form to add a new petition group.</p>
            <AddPetitionGroupForm onSubmit={addGroup}/>
            <LoadingBox loading={loading} error={error} errorMessage={errorMessage} />
        </section>
    );
}

export default AddPetitionGroupView
