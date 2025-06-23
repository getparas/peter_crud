import UserForm from "@/components/forms/user-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserPlus } from "lucide-react";

export default function Home() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-4 p-4 md:p-24">
      <h1 className="text-2xl font-bold">Users</h1>
      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              Add User <UserPlus className="size-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add User</DialogTitle>
              <DialogDescription>Add a user to the database.</DialogDescription>

              <UserForm />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
