import { useQuery } from "@tanstack/react-query";
import Post from "../../components/post/Post";
import { fetchAllPosts } from "../../api/APIEndpoints";
import { IPost } from "../../interface/IPost";
import UploadView from "../../components/UploadView";

const Feed = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["Posts"],
    queryFn: fetchAllPosts,
  });

  const Posts = data?.data?.data || [];

  if (isPending) {
    return <div>....Loading</div>;
  }
  if (isError) {
    return <div>{error.message}</div>;
  }

  return (
    <div className="pt-20">
      <div className="upload_view">
        <UploadView />
      </div>

      <div className="">
        {Posts &&
          Posts.length > 0 &&
          Posts.map((post: IPost) => <Post key={post.id} {...post} />)}
      </div>
    </div>
  );
};

export default Feed;
