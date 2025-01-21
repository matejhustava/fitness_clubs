import { useState } from 'react';
import useFetchClubs from '../../hooks/useFetchClubs';
import SearchInput from '../UI/SearchInput';
import classes from './Clubs.module.css';
import Mapview, { MapMarker } from '../UI/Mapview';
import ClubsTable from './ClubsTable';
import { Club } from '../../data/Club';

function Clubs() {
  const [ searchString, setSearchString ] = useState<string>('');
  const [ showMap, setShowMap ] = useState<boolean>(false);
  const { clubs, error, loading } = useFetchClubs();

  const clubsForDisplay: Club[] = searchString !== '' ? clubs.filter((club) =>
    (club.listName + club.address.address1 + club.address.country + club.address.city + club.address.postalCode)
      .toLowerCase().includes(searchString.toLowerCase())
  ) : clubs;

  const markers: MapMarker[] = clubsForDisplay.filter(club => club.geoLocation).map((club) => ({
    id: club.id,
    text: club.listName + ' - ' + club.address.address1 + ', ' + club.address.city + ', ' + club.address.country,
    geolocation: club.geoLocation
  }));

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
          {showMap && <Mapview markers={markers} zoom={7} center={{latitude: 60, longitude: 10}}/>}
          <div>
            <SearchInput placeholder='Find your club' searchChanged={handleSearchChanged} />
            {clubsForDisplay.length > 0 && <button className='button' onClick={() => setShowMap((prevValue) => !prevValue)}>{showMap ? 'HIDE MAP' : 'SHOW MAP'}</button>}
          </div>
          <ClubsTable clubs={clubsForDisplay} />
          {clubsForDisplay.length === 0 && <div className='no-items'>No clubs matching your search</div>}
        </div>
      }
    </>
  );
}

export default Clubs;