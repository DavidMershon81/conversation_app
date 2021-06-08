import useFetchDataAuth from  '../hooks/useFetchDataAuth'
import { LoadingBox } from './MiscControls';
import { Link } from 'react-router-dom';

const HomeView = () => {
    const { data:groups, loading, error, errorMessage } = useFetchDataAuth({ url:'/api/petition_groups'});

    return (
        <section>
            <h2>Home (user view)</h2>
            <p>Welcome to the petition app!</p>

            <p>Here are a list of the petition groups that you're a member of</p>
            <ul className='petition_groups_list_group'>
            {groups && groups.map((petitionGroup) => 
            <li className='petition_groups_list_item' key={petitionGroup['id']}>
                <Link className='petition_groups_list_btn' to={`/petition_group/${petitionGroup['id']}`}>View</Link>
                <span>id:{petitionGroup['id']}</span>
                <span>{petitionGroup['group_name']}</span>
            </li>)}
            </ul>
            {groups && <div className='add_petition_group_btn'>
                <Link className='add_petition_group_text' to='/add_petition_group'>Add New Petition Group</Link>
            </div>}
            <LoadingBox loading={loading} error={error} errorMessage={errorMessage} />
        </section>
    );
}

export default HomeView
