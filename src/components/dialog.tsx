import React, { Dispatch, SetStateAction } from "react";
import {
  ShadCnDialog,
  ShadCnDialogContent,
  ShadCnDialogDescription,
  ShadCnDialogHeader,
  ShadCnDialogTitle,
  ShadCnDialogTrigger,
} from "./ui/shadcn-dialog";

type DialogProps = {
  buttonTrigger: React.ReactNode;
  content: React.ReactNode;
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
};

const Dialog = ({
  buttonTrigger,
  content,
  isModalOpen,
  setIsModalOpen,
  title,
}: DialogProps) => {
  return (
    <ShadCnDialog onOpenChange={setIsModalOpen} open={isModalOpen}>
      <ShadCnDialogTrigger asChild>{buttonTrigger}</ShadCnDialogTrigger>
      <ShadCnDialogContent>
        <ShadCnDialogHeader>
          <ShadCnDialogTitle>{title}</ShadCnDialogTitle>
          <ShadCnDialogDescription>{content}</ShadCnDialogDescription>
        </ShadCnDialogHeader>
      </ShadCnDialogContent>
    </ShadCnDialog>
  );
};

export default Dialog;
