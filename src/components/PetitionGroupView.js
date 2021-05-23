import { useLocation } from 'react-router-dom';
import useFetchData from  '../hooks/useFetchData'
import { LoadingBox } from './MiscControls';
import AddPetitionForm from './AddPetitionForm';
import { useRef } from 'react';

const PetitionGroupPetitionsSection = ({ petitionGroupId }) => {
    const getRequestParams = useRef({ petition_group_id : petitionGroupId });
    const { data:petitions, addData:addPetition, loading, error } = useFetchData({ 
        getUrl:'/api/petitions', postUrl:'/api/petitions', getRequestParams:getRequestParams.current 
    });

    if(petitions) {
        petitions.forEach(p => console.log(p));
    }
    
    return (
      <>
      <br/><strong>Petitions</strong>
      <LoadingBox loading={loading} error={error} />
      <AddPetitionForm petitionGroupId={petitionGroupId} onSubmit={addPetition} />
      <ul className='users_list_group'>
      { (petitions && petitions.length > 0) ? petitions.map((petition, index) => 
        <li className='users_list_item' key={index}>
            <p>Petition Text: {petition['petition_text']}</p>
        </li>) : 
        <p>This group has no petition yet.</p>
      }
      </ul>
      </>
    );
};

const PetitionGroupMembersList = ({ petitionGroupId }) => {
    const getRequestParams = useRef({ petition_group_id : petitionGroupId });
    const { data:members, loading, error } = useFetchData({ getUrl:'/api/members', getRequestParams:getRequestParams.current });
    
    return (
      <>
      <br/><strong>Members</strong>
      <LoadingBox loading={loading} error={error} />
      <ul className='users_list_group'>
      { (members && members.length > 0) ? members.map((member) => 
        <li className='users_list_item' key={member['email']}>{member['email']}</li>) : 
        <p>This group has no members yet.</p>
      }
      </ul>
      </>
    );
};
  
const PetitionGroupSummary = ({ petitionGroup }) => {
return (
    <p>
        <strong>id:</strong> {petitionGroup['id']}<br/>
        <strong>listserv_email:</strong> {petitionGroup['listserv_email']}<br/>
    </p>
    );
};

const PetitionGroupView = ({ basePath }) => {
    const location = useLocation();
    const petitionGroupId = location.pathname.replace(basePath, '');
    const { data:petitionGroup, loading, error } = useFetchData({ getUrl:`/api/petition_groups/${petitionGroupId}` });

    return (
        petitionGroup ?
        <section>
            <h2>Petition Group: {petitionGroup.group_name}</h2>
            <LoadingBox loading={loading} error={error} />
            <PetitionGroupSummary petitionGroup={petitionGroup} />
            <PetitionGroupMembersList petitionGroupId={petitionGroupId} />
            <PetitionGroupPetitionsSection petitionGroupId={petitionGroup['id']} />
        </section> : <section></section>
    );
}

export default PetitionGroupView;