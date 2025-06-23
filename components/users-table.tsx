import { getUsers } from "@/server/users";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogContent,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Pencil, Mail, User, Calendar, Users } from "lucide-react";
import UserForm from "./forms/user-form";
import DeleteUserButton from "./delete-user-button";

export default async function UsersTable() {
  const users = await getUsers();

  return (
    <div className="p-6">
      {/* Table Header */}
      <div className="mb-6 flex items-center gap-3 border-b-2 border-black pb-4">
        <Users className="size-6" />
        <h3 className="text-xl font-bold text-black">
          All Users ({users.length})
        </h3>
      </div>

      {users.length === 0 ? (
        <div className="py-12 text-center">
          <div className="mx-auto mb-4 w-fit rounded-full bg-gray-100 p-4">
            <Users className="size-12 text-gray-400" />
          </div>
          <h3 className="mb-2 text-xl font-semibold text-black">
            No users found
          </h3>
          <p className="text-gray-600">
            Get started by adding your first user to the system.
          </p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="border-b-2 border-black hover:bg-transparent">
              <TableHead className="py-4 text-base font-bold text-black">
                <div className="flex items-center gap-2">
                  <Mail className="size-4" />
                  Email
                </div>
              </TableHead>
              <TableHead className="text-base font-bold text-black">
                <div className="flex items-center gap-2">
                  <User className="size-4" />
                  Username
                </div>
              </TableHead>
              <TableHead className="text-base font-bold text-black">
                <div className="flex items-center gap-2">
                  <Calendar className="size-4" />
                  Created
                </div>
              </TableHead>
              <TableHead className="text-right text-base font-bold text-black">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user, index) => (
              <TableRow
                key={user.id}
                className={`border-b border-gray-200 transition-colors hover:bg-gray-50 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                }`}
              >
                <TableCell className="py-4 font-medium">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-black p-2 text-white">
                      <Mail className="size-4" />
                    </div>
                    <span className="text-black">{user.email}</span>
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-gray-100 p-2">
                      <User className="size-4" />
                    </div>
                    <span className="font-medium text-black">
                      {user.username}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-4 text-gray-600">
                  {user.createdAt?.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </TableCell>
                <TableCell className="py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-lg p-2 hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Pencil className="size-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="rounded-2xl border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                        <DialogHeader>
                          <DialogTitle className="text-2xl font-bold text-black">
                            Edit User
                          </DialogTitle>
                        </DialogHeader>
                        <UserForm user={user} />
                      </DialogContent>
                    </Dialog>
                    <DeleteUserButton userId={user.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}
