import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Bot, RefreshCw, Save } from "lucide-react";

const tones = ["Warm", "Casual", "Formal", "Professional", "Friendly", "Apologetic", "Premium"];
const languages = ["English", "Hindi", "Hinglish", "Auto-detect review language"];

const sampleReplies: Record<string, string> = {
  Warm: "Thank you so much for your kind words! We're absolutely thrilled you loved your experience at Glow Salon. Our team puts their heart into every service, and hearing this truly makes our day. We can't wait to welcome you back soon!",
  Casual: "Hey, thanks for the awesome review! Really glad you had a great time with us. Come back anytime!",
  Formal: "Dear valued customer, we sincerely appreciate you taking the time to share your experience. Your positive feedback is greatly appreciated and serves as motivation for our entire team.",
  Professional: "Thank you for your review. We're pleased to hear that you had a positive experience. We look forward to serving you again.",
  Friendly: "Wow, this made our day! Thanks so much for the lovely review. The whole team will love hearing this. See you next time!",
  Apologetic: "We truly appreciate your honest feedback. We're sorry if anything fell short of your expectations and we're committed to doing better. Please give us another chance.",
  Premium: "We are deeply honored by your thoughtful review. At Glow Salon, we are committed to providing an exceptional experience for every guest. We look forward to welcoming you again.",
};

export default function AIRepliesPage() {
  const [tone, setTone] = useState("Warm");
  const [language, setLanguage] = useState("English");
  const [instructions, setInstructions] = useState("Always thank customers warmly, keep replies short, and mention our business name.");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-foreground mb-4">AI Reply Settings</h3>

          <div className="space-y-4">
            <div>
              <Label className="mb-2 block">Default AI Tone</Label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {tones.map(t => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    data-testid={`tone-${t.toLowerCase()}`}
                    className={`px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${tone === t ? "bg-primary text-primary-foreground border-primary" : "border-border text-foreground hover:bg-muted"}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="mb-2 block">Language Preference</Label>
              <div className="space-y-2">
                {languages.map(lang => (
                  <label key={lang} className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="radio"
                      name="language"
                      value={lang}
                      checked={language === lang}
                      onChange={() => setLanguage(lang)}
                      data-testid={`language-${lang.toLowerCase().replace(/\s+/g, "-")}`}
                      className="accent-primary"
                    />
                    <span className="text-sm text-foreground">{lang}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="instructions" className="mb-2 block">Custom Business Instructions</Label>
              <Textarea
                id="instructions"
                rows={4}
                value={instructions}
                onChange={e => setInstructions(e.target.value)}
                placeholder="e.g., Always thank customers warmly, keep replies under 3 sentences..."
                data-testid="textarea-ai-instructions"
              />
              <p className="text-xs text-muted-foreground mt-1">The AI will follow these instructions when generating replies.</p>
            </div>

            <Button onClick={handleSave} className="w-full gap-2" data-testid="button-save-ai-settings">
              <Save className="w-4 h-4" />
              {saved ? "Saved!" : "Save Settings"}
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Bot className="w-5 h-5 text-primary" />
            <h3 className="font-semibold text-foreground">AI Reply Preview</h3>
            <span className="ml-auto text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full font-medium">{tone} Tone</span>
          </div>

          <div className="mb-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Sample Review</p>
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex gap-0.5 mb-2">
                {[1,2,3,4,5].map(i => (
                  <span key={i} className="text-amber-400 text-sm">★</span>
                ))}
              </div>
              <p className="text-sm text-foreground italic">"The food was amazing and the service was really quick! Highly recommend this place to everyone."</p>
              <p className="text-xs text-muted-foreground mt-1">— Priya S., Pune Branch</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">Generated Reply</p>
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <p className="text-sm text-foreground">{sampleReplies[tone]}</p>
            </div>
          </div>

          <Button variant="outline" className="w-full mt-3 gap-2" data-testid="button-regenerate">
            <RefreshCw className="w-4 h-4" /> Regenerate Reply
          </Button>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-5 shadow-sm">
          <h3 className="font-semibold text-foreground mb-3">Current Settings</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">AI Tone</span><span className="font-medium text-foreground">{tone}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Language</span><span className="font-medium text-foreground">{language}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">AI Model</span><span className="font-medium text-foreground">Gemini 1.5 Flash</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Replies This Month</span><span className="font-medium text-foreground">156</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
