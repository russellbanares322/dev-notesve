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
  children: React.ReactNode;
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  title: string;
};

const Dialog = ({
  buttonTrigger,
  children,
  open,
  onOpenChange,
  title,
}: DialogProps) => {
  return (
    <ShadCnDialog onOpenChange={onOpenChange} open={open}>
      <ShadCnDialogTrigger asChild>{buttonTrigger}</ShadCnDialogTrigger>
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
