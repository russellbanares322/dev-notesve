import { useState } from "react";
import Dialog from "./dialog";

type CreateUpdateNoteModalProps = {
  buttonTrigger: React.ReactNode;
};

const CreateUpdateNoteModal = ({
  buttonTrigger,
}: CreateUpdateNoteModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Dialog
      buttonTrigger={buttonTrigger}
      title="Create Note"
      open={isModalOpen}
      onOpenChange={setIsModalOpen}
    >
      <h1>Form here</h1>
    </Dialog>
  );
};

export default CreateUpdateNoteModal;
