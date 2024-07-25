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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/theme-solarized_dark";
import "ace-builds/src-noconflict/mode-javascript";

type CreateUpdateNoteModalProps = {
  buttonTrigger: React.ReactNode;
};

type CreateNoteInputs = Pick<DevNotes, "title" | "category" | "content">;

const CreateUpdateNoteSchema = z.object({
  title: z.string({
    required_error: "Title is required.",
  }),
  category: z.string({
    required_error: "Category is required.",
  }),
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
        <form
          className="flex flex-col gap-2"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Title */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Please input the title of your note..."
                    onChange={field.onChange}
                    value={field.value}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Please select the category of your note..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="apple">Apple</SelectItem>
                      <SelectItem value="banana">Banana</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Code Snippet */}
          <div className="space-y-2">
            <FormLabel>Code Snippet</FormLabel>
            <AceEditor
              mode="javascript"
              theme="solarized_dark"
              name="content"
              fontSize={14}
              lineHeight={19}
              showPrintMargin={false}
              showGutter={false}
              highlightActiveLine={false}
              width="29rem"
              style={{ borderRadius: ".3rem" }}
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </Dialog>
  );
};

export default CreateUpdateNoteModal;
