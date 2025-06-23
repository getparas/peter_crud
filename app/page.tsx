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
import UsersTable from "@/components/users-table";
import { UserPlus, Database } from "lucide-react";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Header Section */}
      <div className="bg-black text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-24">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-xl bg-white/10 p-3 backdrop-blur-sm">
              <Database className="size-8" />
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                Peter - User Management
              </h1>
              <p className="mt-1 text-gray-300">Manage your users with style</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative mx-auto max-w-7xl px-4 py-8 md:px-24">
        {/* Stats Cards */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border-2 border-black bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-3">
              <UserPlus className="size-8" />
              <div>
                <p className="text-sm font-medium text-gray-600">Operations</p>
                <p className="text-2xl font-bold">CRUD</p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-black">Users Directory</h2>
            <p className="mt-1 text-gray-600">
              Manage all your users in one place
            </p>
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button className="rounded-xl border-2 border-black bg-black px-6 py-3 font-semibold text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] transition-all duration-200 hover:bg-gray-800 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,0.3)]">
                <UserPlus className="mr-2 size-5" />
                Add New User
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-black">
                  Add New User
                </DialogTitle>
                <DialogDescription className="text-gray-600">
                  Create a new user account in the system.
                </DialogDescription>
              </DialogHeader>
              <UserForm />
            </DialogContent>
          </Dialog>
        </div>

        {/* Users Table */}
        <div className="overflow-hidden rounded-2xl border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <UsersTable />
        </div>
      </div>
    </div>
  );
}
