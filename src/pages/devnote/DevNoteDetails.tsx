import { useParams } from "react-router-dom";

const DevNoteDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
};

export default DevNoteDetails;
