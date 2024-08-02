interface Media {
  source: string;
}

const MediaView = ({ source }: Media) => {
  const isImage = (url: string) => {
    return /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(url);
  };

  const isVideo = (url: string) => {
    return /\.(mp4|webm|ogg|mov|avi|mkv)$/i.test(url);
  };

  if (isImage(source)) {
    return (
      <div>
        <img src={source} alt="" />
      </div>
    );
  }

  if (isVideo(source)) {
    return (
      <div>
        <video controls>
          <source src={source} />
        </video>
      </div>
    );
  }
};

export default MediaView;
