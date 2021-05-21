import useFetchData from  '../hooks/useFetchData'

const PetitionGroupMembersList = ({ petitionGroupId }) => {
  const { data:members, loading, error } = useFetchData(`/api/get_members/${petitionGroupId}`, '/api/add_members');

  return (
    <>
    <br/><strong>Members</strong>
    { (loading || error) &&
    <div className="loading_box">
          {loading && <p>Members Loading...</p>}
          {error && <p>error: can't connect to server.</p>}
    </div>}
    <ul>
    { (members && members.length > 0) ? members.map((member) => 
      <li
          key={member['email']}>
          <strong>email:</strong> {member['email']}
      </li>) : <p>This petition has no members yet.</p>
    }
    </ul>
    </>
  );
};

const PetitionGroupSummary = ({ petitionGroup }) => {
  return (
    <p>
        <strong>id:</strong> {petitionGroup['id']}<br/>
        <strong>group_name:</strong> {petitionGroup['group_name']}<br/>
        <strong>listserv_email:</strong> {petitionGroup['listserv_email']}<br/>
    </p>
    );
};

export { PetitionGroupMembersList, PetitionGroupSummary };