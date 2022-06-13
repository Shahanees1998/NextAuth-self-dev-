// domain/
import MeetupList from "../components/MeetupList";
import { useEffect, useState } from "react";
import { MongoClient } from "mongodb";
import { useRouter } from "next/router";
import NewMeetupForm from "../components/NewMeetupForm";
import NewMeetup from '../pages/src/products/NewMeetup'
import connectDB from "../connectDB";
import Products from '../model/productModel'

export default function HomePage(props) {
  const [loadedMeetups, setLoadedMeetups] = useState([]);
const router = useRouter()
//console.log(props)
  useEffect(() => {
    //send HTTP request to fetch meetups from backedn
 //   setLoadedMeetups(DUMMY_MEETUPS);
  }, []);
if(!props.meet)
{
  return (
    <NewMeetup />
  )
}
else {
  return <MeetupList meetups = {props.meet}/>;

}
}
{
  /* 
export async function getServerSideProps (context) {

    const res = context.res;
    const req = context.req;
    return{
        props : {
            meetups : DUMMY_MEETUPS
        }
     
    }}
    */
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://Shahanees1998:Anees1998@cluster0.blq4q.mongodb.net/nex-auth?retryWrites=true&w=majority"
  );
  const db = client.db();
  //console.log(db)
  const meetupCollection = db.collection("products");
  //console.log(meetupCollection)
  const meetups1 = await meetupCollection.find().toArray();
  const meet = JSON.stringify(meetups1)
 // console.log(meetups1)
  //client.close();
  return {
    props: {
   meet: meetups1.map ((item) => ({
    id : JSON.stringify(item._id),
    title: JSON.stringify(item.title),
    price: JSON.stringify(item.price),
    owner: JSON.stringify(item.owner)
   }))
    
   
   
    },
    revalidate: 10,
  };
}