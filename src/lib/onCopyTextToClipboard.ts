import { toast } from "@/components/ui/use-toast";

export const onCopyTextToClipboard = (text: string) => {
    try {
        navigator.clipboard.writeText(text);
        toast({
          description: "Successfully copied code to clipboard",
        });
      } catch (error) {
        toast({
          description: "Failed to copy code",
          variant: "destructive",
        });
      }
}