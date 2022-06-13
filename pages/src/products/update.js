import { useRef,useEffect } from 'react';
import { toast } from "react-toastify"
import axios from "axios"
import { useRouter } from 'next/router';
//import Card from '../ui/Card';
import classes from '../../../components/NewMeetupForm.module.css';
import { withRouter } from 'next/router'

function Update(props) {
 // console.log(props.id)
  
  useEffect(() => {
    // Update the document title using the browser API
   //console.log(props.router.query.name)
  });
  const router = useRouter()
  const titleInputRef = useRef();
  const priceInputRef = useRef();
  const ownerInputRef = useRef();

  const SubmitHandler = async (e) => {
    e.preventDefault()
    const enteredTitle = titleInputRef.current.value;
    const enteredPrice = priceInputRef.current.value;
    const enteredOwner = ownerInputRef.current.value;
    const id =props.router.query.id

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }
console.log('api calling')
      const { data } = await axios.put(
        `/api/newproducts/Update`,
        { id,enteredTitle, enteredPrice, enteredOwner },
        config
      )

      toast.success(data.message)
   //router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <form className={classes.form} onSubmit={SubmitHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>Meetup Title</label>
          <input type='text' required id='title' ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='image'>Meetup Image</label>
          <input type='text' required id='image' ref={priceInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='address'>Address</label>
          <input type='text' required id='address' ref={ownerInputRef} />
        </div>
        <div className={classes.control}>
       
        </div>
        <div className={classes.actions}>
          <button type='submit'>updaet Meetup</button>
        </div>
      </form>
    </div>
  );
}

export default withRouter(Update);