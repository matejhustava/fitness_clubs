import { useState } from 'react';
import useFetchClubs from '../../hooks/useFetchClubs';
import SearchInput from '../UI/SearchInput';
import classes from './Clubs.module.css';

function Clubs() {
  const [ searchString, setSearchString ] = useState<string>('');
  const { clubs, error, loading } = useFetchClubs();

  const clubsForDisplay = searchString !== '' ? clubs.filter((club) =>
    (club.listName + club.address.address1 + club.address.country + club.address.city + club.address.postalCode)
      .toLowerCase().includes(searchString.toLowerCase())
  ) : clubs;

  const handleSearchChanged = (value: string) => {
    setSearchString(value);
  }

  return (
    <>
      {loading && <div className='loading'>Loading...</div>}
      {error && <div className='error'>Oops... Error occured: {error}</div>}
      {clubs.length === 0 && !loading && !error && <div className='no-items'>No clubs found</div>}
      {clubs.length > 0 && !loading && !error &&
        <div className={classes.clubs}>
          <SearchInput placeholder='Find your club' searchChanged={handleSearchChanged} />
          <table className={classes['clubs-table']} cellPadding='0' cellSpacing='0'>
            <thead>
              <tr>
                <th className={classes.name}>NAME</th>
                <th className={classes.country}>COUNTRY</th>
                <th className={classes.city}>CITY</th>
                <th className={classes.address}>ADDRESS</th>
              </tr>
            </thead>
            <tbody>
              {clubsForDisplay.map((club) => (
                <tr key={club.id} className={classes['club-row']}>
                  <td className={classes.name}>{club.listName}</td>
                  <td className={classes.country}>{club.address.country}</td>
                  <td className={classes.city}>{club.address.city}, {club.address.postalCode}</td>
                  <td className={classes.address}>{club.address.address1}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {clubsForDisplay.length === 0 && <div className='no-items'>No clubs matching your search</div>}
        </div>
      }
    </>
  );
}

export default Clubs;