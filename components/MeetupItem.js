//import Card from '../ui/Card';
import classes from './MeetupItem.module.css';
import { useRouter } from 'next/router';
import Router from 'next/router';
import axios from "axios"
import { toast } from "react-toastify"

function MeetupItem(props) {
//console.log(props)
const router = useRouter();

function showDetailHandler () {

  router.push({
    pathname: '/new-meetup/' + props.id,
    query: { name: 'Anees' }
}, `/new-meetup/${props.id}`);
}
const SubmitHandler = async (id) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    }
console.log(id)
    const { data } = await axios.put(
      `/api/newproducts/delete`,
      { id,enteredTitle: 'hello titile', enteredPrice : '1200', enteredOwner: 'anees' },
      config
    )
router.push('/')
    toast.success(data.message)
 //router.push('/')
  } catch (error) {
    console.log(error)
  }
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
          <h3>{props.owner}</h3>
        </div>
        <div className={classes.actions}>
          <button onClick={() => router.push('/src/products/NewMeetup')}>Add New</button>
        </div>
        <div className={classes.actions}>
          <button onClick={() => SubmitHandler(props.id)
             }>Delete</button>
        </div>
        <div className={classes.actions}>
          <button onClick={() =>
             Router.push({
              pathname:'/src/products/update',
              query: { title: props.title,
                id : props.id
                ,
              price : props.price,
              owner : props.owner
              }
          })
             }>Update</button>
        </div>
    </li>
  );
}

export default MeetupItem;

  