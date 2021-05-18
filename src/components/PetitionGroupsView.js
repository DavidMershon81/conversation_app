import useFetchData from  '../hooks/useFetchData'
import AddPetitionGroupForm from './AddPetitionGroupForm';
 
const PetitionGroupMembersList = ({ petitionGroupId }) => {
  const [ members, addMembers, membersLoading, membersError ] = useFetchData(`/api/get_members/${petitionGroupId}`, '/api/add_members');
  console.log(members);

  return (
    <>
    <br/><strong>Members</strong>
    { (members && members.length > 0) ? members.map((member) => 
      <p
          key={member['email']}>
          <strong>email:</strong> {member['email']}<br/>
      </p>) : <p>This petition has no members yet.</p>
    }
    </>
  );
};

const PetitionGroupsView = () => {
  const [ groups, addGroup, groupsLoading, groupsError ] = useFetchData('/api/get_petition_groups', '/api/add_petition_group');

  return (
      <section>
        <h2>Petition Groups</h2>
        <AddPetitionGroupForm onSubmit={addGroup}/>
        <div className="loading_box">
          {groupsLoading && <p>Groups Loading...</p>}
          {groupsError && <p>error: can't connect to server (groups).</p>}
        </div>

        <ul>
        {groups && groups.map((petitionGroup) => 
          <li 
              key={petitionGroup['id']}>
              <strong>id:</strong> {petitionGroup['id']}<br/>
              <strong>group_name:</strong> {petitionGroup['group_name']}<br/>
              <strong>listserv_email:</strong> {petitionGroup['listserv_email']}<br/>
              <PetitionGroupMembersList petitionGroupId={petitionGroup['id']} />
          </li>)}
        </ul>
      </section>
  );
}

export default PetitionGroupsView
