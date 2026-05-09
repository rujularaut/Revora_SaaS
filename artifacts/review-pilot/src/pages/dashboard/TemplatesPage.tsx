import { useState } from "react";
import { mockTemplates, Template } from "@/lib/mock-data";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Plus, Edit3, Copy, Trash2, Search, FileText } from "lucide-react";

const categories = ["5-star happy customer", "4-star positive review", "Neutral review", "1–2 star complaint", "Delayed service complaint", "Staff behavior complaint", "Food quality complaint", "No-text rating-only review"];
const tones = ["Warm", "Casual", "Formal", "Professional", "Friendly", "Apologetic", "Premium"];
const variables = ["{{customer_name}}", "{{business_name}}", "{{location_name}}", "{{service_name}}"];

function CreateTemplateModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [text, setText] = useState("");
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>Create Template</DialogTitle></DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <Label>Template Name</Label>
            <Input placeholder="5-Star Thank You" className="mt-1" data-testid="input-template-name" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Category</Label>
              <Select>
                <SelectTrigger className="mt-1" data-testid="select-template-category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label>Tone</Label>
              <Select>
                <SelectTrigger className="mt-1" data-testid="select-template-tone">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>{tones.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label>Template Text</Label>
            <Textarea value={text} onChange={e => setText(e.target.value)} rows={6} placeholder="Write your template here..." className="mt-1 text-sm" data-testid="textarea-template-text" />
          </div>
          <div>
            <Label className="mb-2 block text-xs">Available Variables</Label>
            <div className="flex flex-wrap gap-1.5">
              {variables.map(v => (
                <button key={v} onClick={() => setText(t => t + " " + v)}
                  className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-md hover:bg-primary/20 font-mono" data-testid={`variable-${v}`}>
                  {v}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="flex-1" data-testid="button-save-template">Save Template</Button>
            <Button variant="outline" onClick={onClose}>Cancel</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function TemplatesPage() {
  const [createOpen, setCreateOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [templates, setTemplates] = useState(mockTemplates);

  const filtered = templates.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  const toggleActive = (id: string) => {
    setTemplates(ts => ts.map(t => t.id === id ? { ...t, active: !t.active } : t));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search templates..." className="pl-9" value={search} onChange={e => setSearch(e.target.value)} data-testid="input-template-search" />
        </div>
        <Button onClick={() => setCreateOpen(true)} className="gap-2" data-testid="button-create-template">
          <Plus className="w-4 h-4" /> Create Template
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered.length === 0 ? (
          <div className="col-span-2 py-16 text-center text-muted-foreground">
            <FileText className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>No templates found</p>
          </div>
        ) : filtered.map(template => (
          <div key={template.id} className="bg-card border border-card-border rounded-xl p-5 shadow-sm" data-testid={`template-card-${template.id}`}>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-foreground text-sm">{template.name}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{template.category}</p>
              </div>
              <Switch checked={template.active} onCheckedChange={() => toggleActive(template.id)} data-testid={`switch-template-${template.id}`} />
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{template.text}</p>
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <StatusBadge status={template.tone} />
              <span className="text-xs text-muted-foreground">{template.usageCount} uses</span>
              <StatusBadge status={template.active ? "Active" : "Inactive"} />
            </div>
            <div className="flex gap-1.5">
              <Button size="sm" variant="outline" className="gap-1 h-7 text-xs flex-1" data-testid={`button-edit-template-${template.id}`}><Edit3 className="w-3 h-3" /> Edit</Button>
              <Button size="sm" variant="outline" className="gap-1 h-7 text-xs flex-1" data-testid={`button-duplicate-template-${template.id}`}><Copy className="w-3 h-3" /> Duplicate</Button>
              <Button size="sm" variant="ghost" className="gap-1 h-7 text-xs text-red-500 hover:text-red-600 hover:bg-red-50" data-testid={`button-delete-template-${template.id}`}><Trash2 className="w-3 h-3" /></Button>
            </div>
          </div>
        ))}
      </div>

      <CreateTemplateModal open={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  );
}
