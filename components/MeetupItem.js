//import Card from '../ui/Card';
import classes from './MeetupItem.module.css';
import { useRouter } from 'next/router';
import Router from 'next/router';

function MeetupItem(props) {

const router = useRouter();

function showDetailHandler () {

  router.push({
    pathname: '/new-meetup/' + props.id,
    query: { name: 'Anees' }
}, `/new-meetup/${props.id}`);
}

  return (
    <li className={classes.item}>
        <div className={classes.image}>
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.price}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={() => router.push('/src/products/NewMeetup')}>{props.owner}</button>
        </div>
    </li>
  );
}

export default MeetupItem;

  