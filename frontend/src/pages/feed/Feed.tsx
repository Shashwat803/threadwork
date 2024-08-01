import Post from "../../components/post/Post";
import useFetch from "../../hooks/fetch/useFetch";

const Feed = () => {
  const { data } = useFetch();
  console.log(data)
  return (
    <div>
      <div className="">
        <Post />
      </div>
    </div>
  );
};

export default Feed;
