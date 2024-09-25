import { Dispatch, SetStateAction } from "react";
import Dialog from "./dialog";
import { Button } from "./ui/button";

type PopConfirmProps = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  onConfirm: () => void;
  title: string;
  okText?: string;
  cancelText?: string;
  description: string;
};

const PopConfirm = ({
  open,
  onOpenChange,
  onConfirm,
  title,
  okText,
  cancelText,
  description,
}: PopConfirmProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange} title={title}>
      <div className="mt-3 space-y-2">
        <p>{description}</p>
        <div className="flex items-center justify-end gap-2">
          <Button onClick={() => onOpenChange(false)} variant="outline">
            {cancelText || "No"}
          </Button>
          <Button onClick={onConfirm}>{okText || "Yes"}</Button>
        </div>
      </div>
    </Dialog>
  );
};

export default PopConfirm;
