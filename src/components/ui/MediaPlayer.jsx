const MediaPlayer = ({ type, mediaUrl, thumbnail, title }) => {
  const renderMedia = () => {
    switch (type) {
      case 'video':
        return (
          <div className="aspect-video w-full">
            <iframe
              src={mediaUrl}
              title={title}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        );
      
      case 'audio':
        return (
          <div className="bg-forest/5 p-6 rounded-lg">
            <audio
              controls
              className="w-full"
              style={{
                accentColor: '#1B5E20'
              }}
            >
              <source src={mediaUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        );
      
      case 'image':
        return (
          <img
            src={mediaUrl}
            alt={title}
            className="w-full h-auto rounded-lg object-cover"
          />
        );
      
      case 'text':
      default:
        return (
          <div className="bg-cream border-2 border-forest/20 p-6 rounded-lg flex items-center justify-center min-h-[200px]">
            <span className="text-6xl">📖</span>
          </div>
        );
    }
  };

  return (
    <div className="media-player">
      {renderMedia()}
    </div>
  );
};

export default MediaPlayer;