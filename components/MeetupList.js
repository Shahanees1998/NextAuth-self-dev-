import MeetupItem from './MeetupItem';
import classes from './MeetupList.module.css';

function MeetupList(props) {
  return (
    <ul className={classes.list}>
     
        <MeetupItem
          price = {props.price}
          title={props.title}
          owner={props.owner}
        />
    </ul>
  );
}

export default MeetupList;