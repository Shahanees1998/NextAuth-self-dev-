import MeetupItem from './MeetupItem';
import classes from './MeetupList.module.css';

function MeetupList(props) {
  //console.log(props.meetups)
  return (
    <ul className={classes.list}>
     {props.meetups.map((item) => {
       return(   <MeetupItem
        id = {item.id}
        price = {item.price}
        title={item.title}
        owner={item.owner}
      />)
  
     })}
   
    </ul>
  );
}

export default MeetupList;