import { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import {
  useCreateDevNote,
  useUpdateDevNote,
} from "@/services/devnote/mutations";
import { useGetDevNoteCategories } from "@/services/devnote/queries";
import { CircleX } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Label } from "./ui/label";

type TDataForUpdate = Omit<DevNotes, "date_created" | "author_id">;

type ConditionalProps =
  | {
      isDataForUpdate: boolean;
      dataForUpdate: TDataForUpdate;
    }
  | {
      isDataForUpdate?: never;
      dataForUpdate?: never;
    };

type CreateUpdateNoteModalProps = {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
} & ConditionalProps;

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
  open,
  onOpenChange,
  isDataForUpdate,
  dataForUpdate,
}: CreateUpdateNoteModalProps) => {
  const { user } = useUser();
  const [customFormInputs, setCustomFormInputs] = useState(
    CUSTOM_FORM_INPUTS_DATA
  );

  // Implement auto populate of each field once edit button is clicked
  const onClearFormInputs = () => {
    form.reset();
    setCustomFormInputs(CUSTOM_FORM_INPUTS_DATA);
    onOpenChange(false);
  };
  const { mutate: createDevNoteMutation } = useCreateDevNote(onClearFormInputs);
  const { mutate: updateDevNoteMutation } = useUpdateDevNote(onClearFormInputs);
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

    if (!isDataForUpdate) {
      return createDevNoteMutation(body);
    }

    // Use update devnote api call
    return updateDevNoteMutation({
      ...body,
      id: dataForUpdate?.devnote_id,
    });
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

  //Set a value for inputs if it is for update

  useEffect(() => {
    if (isDataForUpdate) {
      form.setValue("title", dataForUpdate.title);
      form.setValue("category", dataForUpdate.category);
      setCustomFormInputs({
        ...customFormInputs,
        noteContent: dataForUpdate.content,
      });
    }
  }, [isDataForUpdate]);

  return (
    <Dialog
      title={isDataForUpdate ? "Update Note" : "Create Note"}
      open={open}
      onOpenChange={onOpenChange}
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
          <Button disabled={isDataForUpdate} type="submit">
            {isDataForUpdate ? "Save Changes" : "Submit"}
          </Button>
        </form>
      </Form>
    </Dialog>
  );
};

export default CreateUpdateNoteModal;
