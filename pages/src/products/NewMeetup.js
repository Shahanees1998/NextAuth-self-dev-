import { useRef } from 'react';
import { toast } from "react-toastify"
import axios from "axios"

//import Card from '../ui/Card';
import classes from '../../../components/NewMeetupForm.module.css';

function NewMeetupForm(props) {
  const titleInputRef = useRef();
  const priceInputRef = useRef();
  const ownerInputRef = useRef();

  const SubmitHandler = async (e) => {
    e.preventDefault()
    const enteredTitle = titleInputRef.current.value;
    const enteredPrice = priceInputRef.current.value;
    const enteredOwner = ownerInputRef.current.value;

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      }

      const { data } = await axios.post(
        `/api/newproducts/products`,
        { enteredTitle, enteredPrice, enteredOwner },
        config
      )

      toast.success(data.message)
   
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
          <button>Add Meetup</button>
        </div>
      </form>
    </div>
  );
}

export default NewMeetupForm;