import { IPost } from "../../interface/IPost";
import MediaView from "../MediaView";

const Post = ({
  text,
  imagesOrVideos
}: IPost) => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md aspect-square bg-[#1e2736] rounded-lg mb-8 border border-gray-700">
        <div>{text}</div>
          {imagesOrVideos && imagesOrVideos.length > 0
          && imagesOrVideos.map((media, i)=> <MediaView key={i} source={media}/>)}
        {/* <div>imageorvideo</div> */}
      </div>
    </div>
  );
};

export default Post;
