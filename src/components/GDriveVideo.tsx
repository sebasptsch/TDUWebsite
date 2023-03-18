interface GDriveVideoProps {
    id: string
  }
  
  export default function GDriveVideo({id}: GDriveVideoProps) {
    return (
      <figure className="image is-16by9">
        <video
          className="has-ratio"
          preload="auto"
          controls
        >
            <source src={`https://drive.google.com/uc?export=download&id=${id}`} type="video/mp4" />
        </video>
      </figure>
    );
  }
  