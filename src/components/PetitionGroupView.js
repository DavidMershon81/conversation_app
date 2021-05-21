import { useLocation, Link } from 'react-router-dom';
import useFetchData from  '../hooks/useFetchData'
import { PetitionGroupMembersList, PetitionGroupSummary } from './PetitionGroupControls';

const PetitionGroupView = ({ basePath }) => {
    const location = useLocation();
    const petitionGroupId = location.pathname.replace(basePath, '');
    const { data:petitionGroup, loading, error } = useFetchData(`/api/petition_groups/${petitionGroupId}`, '');

    return (
        <section>
            {petitionGroup && <h2>Petition Group: {petitionGroup.group_name}</h2>}
            {(loading || error) &&
            (<div className="loading_box">
            {loading && <p>Groups Loading...</p>}
            {error && <p>error: can't connect to server (groups).</p>}
            </div>)}

            {petitionGroup && <PetitionGroupSummary petitionGroup={petitionGroup} /> }
            <PetitionGroupMembersList petitionGroupId={petitionGroupId} />
        </section>
    );
}

export default PetitionGroupView;