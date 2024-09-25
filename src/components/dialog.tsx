import React, { Dispatch, SetStateAction } from "react";
import {
  ShadCnDialog,
  ShadCnDialogContent,
  ShadCnDialogDescription,
  ShadCnDialogHeader,
  ShadCnDialogTitle,
} from "./ui/shadcn-dialog";

type DialogProps = {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  title: string;
};

const Dialog = ({ children, open, onOpenChange, title }: DialogProps) => {
  return (
    <ShadCnDialog onOpenChange={onOpenChange} open={open}>
      <ShadCnDialogContent>
        <ShadCnDialogHeader>
          <ShadCnDialogTitle>{title}</ShadCnDialogTitle>
          <ShadCnDialogDescription>{children}</ShadCnDialogDescription>
        </ShadCnDialogHeader>
      </ShadCnDialogContent>
    </ShadCnDialog>
  );
};

export default Dialog;
