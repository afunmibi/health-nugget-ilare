const MediaPlayer = ({ type, mediaUrl, title }) => {
  const isEmbeddableVideo = (url) => {
    if (!url) return false;
    return url.includes('youtube.com/embed/') || url.includes('player.vimeo.com/video/');
  };

  if (type === 'text') {
    return null;
  }

  if (!mediaUrl) {
    return null;
  }

  const renderMedia = () => {
    switch (type) {
      case 'video':
        if (!isEmbeddableVideo(mediaUrl)) {
          return (
            <video controls className="w-100 rounded" style={{ maxHeight: 420 }}>
              <source src={mediaUrl} />
              Your browser does not support the video element.
            </video>
          );
        }

        return (
          <div className="ratio ratio-16x9">
            <iframe
              src={mediaUrl}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        );

      case 'audio':
        return (
          <div className="bg-light p-3 rounded">
            <audio controls className="w-100" style={{ accentColor: '#1B5E20' }}>
              <source src={mediaUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        );

      case 'image':
        return <img src={mediaUrl} alt={title} className="img-fluid rounded" />;

      default:
        return null;
    }
  };

  return <div>{renderMedia()}</div>;
};

export default MediaPlayer;
