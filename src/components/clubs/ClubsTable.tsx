import { memo } from "react";
import { Club } from "../../data/Club";
import classes from './ClubsTable.module.css';

const ClubsTable = memo((props: { clubs: Club[] }) => {
  return (
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
        {props.clubs.map((club) => (
          <tr key={club.id} className={classes['club-row']}>
            <td className={classes.name}>{club.listName}</td>
            <td className={classes.country}>{club.address.country}</td>
            <td className={classes.city}>{club.address.city}, {club.address.postalCode}</td>
            <td className={classes.address}>{club.address.address1}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

export default ClubsTable;