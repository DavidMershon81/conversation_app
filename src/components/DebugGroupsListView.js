import useFetchData from  '../hooks/useFetchData'
import AddPetitionGroupForm from './AddPetitionGroupForm';
import { LoadingBox } from './MiscControls';
import { Link } from 'react-router-dom';

const DebugGroupsListView = () => {
  const { data:groups, addData:addGroup, loading, error, errorMessage } = useFetchData({ 
    url:'/api/debug/petition_groups',
    requireAuth:false
  });
  
  return (
      <section>
        <h2>Petition Groups (Debug View)</h2>
        <p>This page shows all of the petition groups in the app.</p>
        <AddPetitionGroupForm onSubmit={addGroup}/>
        <LoadingBox loading={loading} error={error} errorMessage={errorMessage} />
        <ul className='petition_groups_list_group'>
        {groups && groups.map((petitionGroup) => 
          <li className='petition_groups_list_item' key={petitionGroup['id']}>
            <Link className='petition_groups_list_btn' to={`/petition_group/${petitionGroup['id']}`}>View</Link>
            <span>id:{petitionGroup['id']}</span>
            <span>{petitionGroup['group_name']}</span>
          </li>)}
        </ul>
      </section>
  );
}

export default DebugGroupsListView
