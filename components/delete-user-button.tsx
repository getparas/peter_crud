"use client";

import { deleteUser } from "@/server/users";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Loader2, Trash2, AlertTriangle } from "lucide-react";

interface DeleteUserButtonProps {
  userId: string;
}

export default function DeleteUserButton({ userId }: DeleteUserButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await deleteUser(userId);
      toast.success("User deleted successfully");
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="rounded-lg p-2 hover:bg-red-50 hover:text-red-600"
        >
          <Trash2 className="size-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-2xl border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 w-fit rounded-full bg-red-100 p-3">
            <AlertTriangle className="size-8 text-red-600" />
          </div>
          <DialogTitle className="text-2xl font-bold text-black">
            Delete User
          </DialogTitle>
          <DialogDescription className="text-base text-gray-600">
            This action cannot be undone. This will permanently delete the user
            account and remove all associated data.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 flex gap-3">
          <Button
            variant="outline"
            onClick={() => setIsOpen(false)}
            className="flex-1 rounded-xl border-2 border-black py-3 font-semibold hover:bg-gray-50"
          >
            No, keep it.
          </Button>
          <Button
            disabled={isLoading}
            onClick={handleDelete}
            className="flex-1 rounded-xl border-2 border-red-600 bg-red-600 py-3 font-semibold text-white shadow-[4px_4px_0px_0px_rgba(220,38,38,0.3)] transition-all duration-200 hover:bg-red-700 hover:shadow-[6px_6px_0px_0px_rgba(220,38,38,0.3)]"
          >
            {isLoading ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Trash2 className="mr-2 size-4" />
            )}
            Yes, Delete!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
