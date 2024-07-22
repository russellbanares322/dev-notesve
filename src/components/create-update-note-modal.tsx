import { useState } from "react";
import { z } from "zod";
import Dialog from "./dialog";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { DevNotes } from "@/services/devnote/types";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type CreateUpdateNoteModalProps = {
  buttonTrigger: React.ReactNode;
};

type CreateNoteInputs = Pick<DevNotes, "title" | "category" | "content">;

const CreateUpdateNoteSchema = z.object({
  title: z.string(),
  category: z.string(),
  content: z.string(),
});

const CreateUpdateNoteModal = ({
  buttonTrigger,
}: CreateUpdateNoteModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const form = useForm<z.infer<typeof CreateUpdateNoteSchema>>({
    resolver: zodResolver(CreateUpdateNoteSchema),
  });

  const onSubmit: SubmitHandler<CreateNoteInputs> = (data) => {
    console.log(data);
  };

  return (
    <Dialog
      buttonTrigger={buttonTrigger}
      title="Create Note"
      open={isModalOpen}
      onOpenChange={setIsModalOpen}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Please input the title of your note..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </Dialog>
  );
};

export default CreateUpdateNoteModal;
