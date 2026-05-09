import { useState } from "react";
import { mockAdminUsers } from "@/lib/mock-data";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Search, Eye, Ban, Mail, MoreHorizontal } from "lucide-react";

function UserDetailModal({ user, open, onClose }: { user: typeof mockAdminUsers[0] | null; open: boolean; onClose: () => void }) {
  if (!user) return null;
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>User Detail</DialogTitle></DialogHeader>
        <div className="space-y-4 py-2">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center text-white font-bold">
              {user.name[0]}{user.name.split(" ")[1]?.[0]}
            </div>
            <div>
              <h3 className="font-bold text-foreground">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <StatusBadge status={user.status} className="ml-auto" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[
              ["Phone", user.phone], ["Country", user.country],
              ["Signup Date", user.signupDate], ["Last Active", user.lastActive],
              ["Plan", user.plan], ["Payment", user.paymentStatus],
              ["Locations", user.locationsCount.toString()], ["Connected", user.businessConnected ? "Yes" : "No"],
            ].map(([label, val]) => (
              <div key={label} className="bg-muted/50 rounded-lg p-3">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-medium text-foreground">{val}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex-1 gap-1.5"><Mail className="w-3.5 h-3.5" /> Email User</Button>
            <Button size="sm" variant="outline" className="flex-1 gap-1.5 text-orange-600 border-orange-200 hover:bg-orange-50"><Ban className="w-3.5 h-3.5" /> Suspend</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [plan, setPlan] = useState("all");
  const [selectedUser, setSelectedUser] = useState<typeof mockAdminUsers[0] | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = mockAdminUsers.filter(u => {
    if (status !== "all" && u.status.toLowerCase() !== status) return false;
    if (plan !== "all" && u.plan.toLowerCase() !== plan) return false;
    if (search && !u.name.toLowerCase().includes(search.toLowerCase()) && !u.email.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-52">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search by name or email..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} data-testid="input-user-search" />
        </div>
        <Select onValueChange={setStatus} defaultValue="all">
          <SelectTrigger className="w-36" data-testid="select-user-status"><SelectValue placeholder="Status" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="trial">Trial</SelectItem>
            <SelectItem value="suspended">Suspended</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Select onValueChange={setPlan} defaultValue="all">
          <SelectTrigger className="w-32" data-testid="select-user-plan"><SelectValue placeholder="Plan" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Plans</SelectItem>
            <SelectItem value="starter">Starter</SelectItem>
            <SelectItem value="growth">Growth</SelectItem>
            <SelectItem value="pro">Pro</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card border border-card-border rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                {["User", "Phone", "Country", "Plan", "Payment", "Locations", "Last Active", "Status", ""].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground uppercase whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.map(user => (
                <tr key={user.id} className="hover:bg-muted/30 transition-colors" data-testid={`user-row-${user.id}`}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center text-xs font-bold text-violet-600">
                        {user.name[0]}{user.name.split(" ")[1]?.[0]}
                      </div>
                      <div>
                        <p className="font-medium text-foreground whitespace-nowrap">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{user.phone}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{user.country}</td>
                  <td className="px-4 py-3 font-medium whitespace-nowrap">{user.plan}</td>
                  <td className="px-4 py-3"><StatusBadge status={user.paymentStatus} /></td>
                  <td className="px-4 py-3 text-center">{user.locationsCount}</td>
                  <td className="px-4 py-3 text-muted-foreground whitespace-nowrap">{user.lastActive}</td>
                  <td className="px-4 py-3"><StatusBadge status={user.status} /></td>
                  <td className="px-4 py-3">
                    <Button size="sm" variant="ghost" onClick={() => { setSelectedUser(user); setModalOpen(true); }} className="h-7 gap-1 text-xs" data-testid={`button-view-user-${user.id}`}>
                      <Eye className="w-3.5 h-3.5" /> View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-border text-xs text-muted-foreground">
          Showing {filtered.length} of {mockAdminUsers.length} users
        </div>
      </div>

      <UserDetailModal user={selectedUser} open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
