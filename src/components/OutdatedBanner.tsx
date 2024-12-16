import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import type{ FC } from "react";

interface OutdatedBannerProps {
  onUpdate: () => void;
  onIgnore: () => void;
  isLoading: boolean;
}

export const OutdatedBanner: FC<OutdatedBannerProps> = ({ onUpdate, onIgnore, isLoading }) => {
  return (
    <div className="fixed top-0 left-0 w-full bg-yellow-300 text-black py-3 px-6 shadow-lg z-50">
      <div className="flex items-center justify-between">
        <span className="font-semibold">
          ⚠️ The data you're using might be outdated. Please update it to ensure accuracy.
        </span>
        <div className="flex gap-2">
          <Button onClick={onUpdate} className="bg-green-600 hover:bg-green-700 text-white" disabled={isLoading}>
            {isLoading ? <><Loader2 className="w-4 h-4 animate-spin" /> Aggiornamento in corso...</> : 'Aggiorna ora'}
          </Button>
          <Button onClick={onIgnore} className="bg-gray-500 hover:bg-gray-600 text-white" disabled={isLoading}>
            Ignora
          </Button>
        </div>
      </div>
    </div>
  );
};
