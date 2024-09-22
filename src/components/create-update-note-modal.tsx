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
import Editor from "@monaco-editor/react";
import { useUser } from "@clerk/clerk-react";
import { useCreateDevNote } from "@/services/devnote/mutations";
import { useGetDevNoteCategories } from "@/services/devnote/queries";
import { CircleX } from "lucide-react";
import { TooltipTrigger } from "@radix-ui/react-tooltip";
import { Tooltip, TooltipContent } from "./ui/tooltip";
import { Label } from "./ui/label";

type CreateUpdateNoteModalProps = {
  buttonTrigger: React.ReactNode;
  isDataForUpdate?: boolean;
  fetchedDataForUpdate?: DevNotes;
};

type CreateNoteInputs = Pick<DevNotes, "title" | "category">;

const CreateUpdateNoteSchema = z.object({
  title: z.string({
    required_error: "Title is required.",
  }),
  category: z.string({
    required_error: "Category is required.",
  }),
});

const CUSTOM_FORM_INPUTS_DATA = {
  noteContent: "",
  customCategory: "",
};

const CreateUpdateNoteModal = ({
  buttonTrigger,
}: CreateUpdateNoteModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUser();
  const [customFormInputs, setCustomFormInputs] = useState(
    CUSTOM_FORM_INPUTS_DATA
  );

  // Implement auto populate of each field once edit button is clicked
  const onClearFormInputs = () => {
    form.reset();
    setCustomFormInputs(CUSTOM_FORM_INPUTS_DATA);
    setIsModalOpen(false);
  };
  const { mutate: createDevNoteMutation } = useCreateDevNote(onClearFormInputs);
  const { data: categoriesData } = useGetDevNoteCategories(false);

  const form = useForm<z.infer<typeof CreateUpdateNoteSchema>>({
    resolver: zodResolver(CreateUpdateNoteSchema),
  });
  const selectedCategoryValue = form.watch("category");
  const isSelectedCategoryOthers = selectedCategoryValue === "Others";

  const onSubmit: SubmitHandler<CreateNoteInputs> = (data) => {
    const body = {
      title: data?.title,
      category:
        data?.category === "Others"
          ? customFormInputs.customCategory
          : data?.category,
      content: customFormInputs?.noteContent,
      author_id: user?.id as string,
    };

    createDevNoteMutation(body);
  };

  const onCustomFormInputsValueChange = (
    value: string | undefined,
    id: "noteContent" | "customCategory"
  ) => {
    setCustomFormInputs({
      ...customFormInputs,
      [id]: value,
    });
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
          {!isSelectedCategoryOthers && (
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
                        {categoriesData?.map((category: string) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                        <SelectItem value="Others">
                          Add Custom Category
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          {isSelectedCategoryOthers && (
            <div className="flex items-center gap-1 w-full">
              <div className="grid w-full max-w-sm items-center gap-2 mt-1">
                <Label htmlFor="customCategory">Category</Label>
                <Input
                  onChange={(e) =>
                    onCustomFormInputsValueChange(
                      e.target.value,
                      "customCategory"
                    )
                  }
                  value={customFormInputs.customCategory}
                  type="text"
                  id="customCategory"
                  placeholder="Please input category..."
                />
              </div>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => {
                      form.resetField("category");
                      setCustomFormInputs({
                        ...customFormInputs,
                        customCategory: "",
                      });
                    }}
                    type="button"
                    className="mt-6"
                    variant="outline"
                  >
                    <CircleX />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Discard Changes</p>
                </TooltipContent>
              </Tooltip>
            </div>
          )}
          {/* Code Snippet */}
          <div className="space-y-2">
            <FormLabel>Code Snippet</FormLabel>
            <Editor
              height="40vh"
              defaultLanguage="javascript"
              theme="vs-dark"
              value={customFormInputs.noteContent}
              options={{
                lineNumbers: "off",
              }}
              className="rounded-md"
              onChange={(value) =>
                onCustomFormInputsValueChange(value, "noteContent")
              }
            />
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </Dialog>
  );
};

export default CreateUpdateNoteModal;
