/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { FaUser, FaVideo } from "react-icons/fa";
import { FaImages } from "react-icons/fa";
import { uploadPost } from "../api/APIEndpoints";

interface Post {
  text: string;
  media: any[];
}

const UploadView = () => {
  const [postData, setPostData] = useState<Post>({
    text: "",
    media: [],
  });

  const onHandleChange = (e: React.SyntheticEvent) => {
    const { value, name } = e.target as HTMLInputElement;

    setPostData((prevData: any) => {
      if (name === "mediaFiles") {
        const mediaFiles = (e.target as HTMLInputElement).files;
        if (mediaFiles) {
          return {
            ...prevData,
            media: mediaFiles,
          };
        }
      }

      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handlePostSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    mutate(postData);
  };
  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: uploadPost,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (data) => {
      console.log(data);
    },
  });

  if (isError) {
    return (
      <>
        <div className="text-red-500">{error.message}</div>
      </>
    );
  }

  if (isPending) {
    return (
      <>
        <div className="text-yellow-500">Adding Post....</div>
      </>
    );
  }

  if (isSuccess) {
    return (
      <>
        <div className="text-green-500">Uploaded Successfull</div>
      </>
    );
  }

  return (
    <form onSubmit={handlePostSubmit}>
      <div className="media-container flex justify-center w-full text-black">
        <div className=" w-5/12 bg-white rounded-md">
          <div className="text-profile  px-5 py-5 flex  space-x-2">
            <FaUser className="border-2 p-5 rounded-full" />
            <textarea
              className="w-full border p-3"
              placeholder="What's on your mind"
              rows={2}
              name="text"
              onChange={onHandleChange}
            ></textarea>
          </div>
          <div className="buttons flex justify-center space-x-2 mb-4">
            <Button
              variant="contained"
              component="label"
              tabIndex={-1}
              className="space-x-2"
            >
              <input
                type="file"
                name="mediaFiles"
                hidden
                onChange={onHandleChange}
              />
              <FaImages /> <FaVideo />
            </Button>
            <Button variant="contained" type="submit">
              Post
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UploadView;
