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
import Editor, { useMonaco } from "@monaco-editor/react";
import { useUser } from "@clerk/clerk-react";
import {
  useCreateDevNote,
  useUpdateDevNote,
} from "@/services/devnote/mutations";
import { CircleX } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Label } from "./ui/label";
import DropdownSearchInput from "./dropdown-search-input";
import { DataSource } from "@/types/types";

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
  const monacoEditorOptions = useMonaco();
  const [customFormInputs, setCustomFormInputs] = useState(
    CUSTOM_FORM_INPUTS_DATA
  );

  const formattedMonacoEditorLanguages = monacoEditorOptions?.languages
    ?.getLanguages()
    ?.map((item) => ({
      label: item?.id?.toUpperCase(),
      value: item?.id?.toUpperCase(),
    }))
    .filter((data) => !data.label.includes("FREEMARKER2"))
    .sort((a, b) => a.label.localeCompare(b.label)) as DataSource[];

  // Implement auto populate of each field once edit button is clicked
  const onClearFormInputs = () => {
    form.reset();
    setCustomFormInputs(CUSTOM_FORM_INPUTS_DATA);
    onOpenChange(false);
  };
  const {
    mutate: createDevNoteMutation,
    isPending: isCreateDevNoteMutaionPending,
  } = useCreateDevNote(onClearFormInputs);
  const {
    mutate: updateDevNoteMutation,
    isPending: isUpdateDevNoteMutaionPending,
  } = useUpdateDevNote(onClearFormInputs);

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
      title: body.title,
      category: body.category,
      content: body.content,
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
                <FormItem className="flex flex-col">
                  <FormLabel>Category</FormLabel>
                  <DropdownSearchInput
                    dataSource={formattedMonacoEditorLanguages}
                    onSelectValue={(currentValue) => {
                      form.setValue("category", currentValue as string);
                    }}
                    selectedValue={field.value}
                    placeholder="Search or select category..."
                  />
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
              language={selectedCategoryValue?.toLowerCase()}
              theme="vs-dark"
              value={customFormInputs.noteContent}
              options={{
                lineNumbers: "on",
                wordWrap: "on",
              }}
              className="rounded-md"
              onChange={(value) =>
                onCustomFormInputsValueChange(value, "noteContent")
              }
            />
          </div>
          <Button
            disabled={
              isCreateDevNoteMutaionPending || isUpdateDevNoteMutaionPending
            }
            type="submit"
          >
            {isDataForUpdate ? "Save Changes" : "Submit"}
          </Button>
        </form>
      </Form>
    </Dialog>
  );
};

export default CreateUpdateNoteModal;
