import { useRouter } from "next/router";
import MeetupDetail from "../../../components/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";

export default function DetailPage(props) {
  //alert(props.router.query.name)

  const router = useRouter();
  // console.log(router.query.name)
  const id = router.query.meetupId;
  //console.log(id)

  return (
    <MeetupDetail
      title={props.meetupData.title}
      image={props.meetupData.image}
       address={props.meetupData.address}
      description={props.meetupData.description}
    />
  );
}
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://Shahanees1998:Anees1998@cluster0.1gbai.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const meetups1 = await meetupCollection.find({}, { _id: 1 }).toArray();
  client.close();

  return {
    fallback: true,
    paths: meetups1.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
  };
}
export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://Shahanees1998:Anees1998@cluster0.1gbai.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetupCollection = db.collection("meetups");
  const selectedMeetup= await meetupCollection.findOne({ _id : ObjectId(meetupId) });
  client.close();
  return {
    props: {
      meetupData : {
        title: selectedMeetup.title,
        image: selectedMeetup.image,
        address: selectedMeetup.address,
        id: selectedMeetup._id.toString(),
      },
    },
    revalidate: 10,
  };
}
