import { Dispatch, SetStateAction } from "react";
import Dialog from "./dialog";

type CreateUpdateNoteModalProps = {
  buttonTrigger: React.ReactNode;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
};

const CreateUpdateNoteModal = ({
  buttonTrigger,
  isModalOpen,
  setIsModalOpen,
}: CreateUpdateNoteModalProps) => {
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
