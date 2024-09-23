import { useToast } from "@/components/ui/use-toast";
import { CircleCheck, CircleX } from "lucide-react";

type ToastType = "success" | "error";

const useDisplayToast = () => {
  const { toast } = useToast();

  const toastIconMap: Record<ToastType, React.ReactNode> = {
    success: <CircleCheck fill="#52c41a" className="text-white" />,
    error: <CircleX fill="#ff4d4f" className="text-white" />,
  };

  const showToast = (
    type: ToastType,
    title: string,
    message: string | null
  ) => {
    const selectedToastIcon = toastIconMap[type];
    const toastTitle = (
      <div className="flex items-center gap-1">
        {selectedToastIcon}
        {title}
      </div>
    );

    return toast({
      title: toastTitle,
      description: message,
    });
  };

  return { showToast };
};

export default useDisplayToast;
