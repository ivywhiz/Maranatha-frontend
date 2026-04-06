// components/donation/SecurityBadges.tsx
import { ShieldCheck, Lock, CreditCard } from "lucide-react"

export function SecurityBadges() {
  return (
    <div className="mt-6 pt-5 border-t border-white/6">
      <div className="flex items-center justify-center gap-6 flex-wrap">
        <Badge icon={<Lock className="w-3.5 h-3.5" />} label="SSL Encrypted" />
        <Badge icon={<ShieldCheck className="w-3.5 h-3.5" />} label="Stripe Secured" />
        <Badge icon={<CreditCard className="w-3.5 h-3.5" />} label="PCI Compliant" />
      </div>

      {/* Stripe logo lockup */}
      <div className="flex items-center justify-center gap-2 mt-4">
        <span className="text-white/20 text-xs">Powered by</span>
        <svg viewBox="0 0 60 25" className="h-4 opacity-30 fill-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M59.64 14.28h-8.06c.19 1.93 1.6 2.55 3.2 2.55 1.64 0 2.96-.37 4.05-.95v3.32a8.33 8.33 0 01-4.56 1.1c-4.01 0-6.83-2.5-6.83-7.48 0-4.19 2.39-7.52 6.3-7.52 3.92 0 5.96 3.28 5.96 7.5 0 .4-.04 1.26-.06 1.48zm-5.92-5.62c-1.03 0-2.17.73-2.17 2.58h4.23c0-1.85-1.07-2.58-2.06-2.58zM40.96 20.3c-1.48 0-2.46-.64-3.0-1.08l-.02 4.44-4.06.85V6.26h3.59l.16 1.08c.53-.68 1.64-1.33 3.1-1.33 2.66 0 5.07 2.43 5.07 7.1 0 5.11-2.37 7.2-4.84 7.2v-.01zm-.7-10.5c-.86 0-1.46.4-1.76.96l.04 5.02c.28.52.86.9 1.72.9 1.3 0 2.17-1.44 2.17-3.44 0-1.95-.88-3.44-2.17-3.44zM28.94 6.26h4.06v14.08h-4.06V6.26zm0-4.58l4.06-.86v3.29l-4.06.86V1.68zM23.77 7.9l-.26-1.64H19.7v14.08h4.06v-9.32c.96-1.25 2.59-.97 3.1-.82V6.26c-.54-.19-2.5-.51-3.1 1.64zM14.86 4.24l-3.96.84-.02 12.96c0 2.39 1.79 4.16 4.18 4.16 1.32 0 2.29-.24 2.82-.53v-3.28c-.52.2-3.06.94-3.06-1.41V9.9h3.06V6.26h-3.06L14.86 4.24zM4.96 10.87c0-.63.52-.87 1.38-.87 1.23 0 2.78.37 4.01 1.03V7.14A10.64 10.64 0 006.33 6c-3.64 0-6.07 1.9-6.07 5.07 0 4.94 6.8 4.15 6.8 6.29 0 .74-.65 .98-1.55 .98-1.34 0-3.06-.55-4.41-1.29v3.94a11.2 11.2 0 004.38.92c3.72 0 6.28-1.84 6.28-5.05 0-5.33-6.8-4.38-6.8-6.0z"/>
        </svg>
      </div>
    </div>
  )
}

function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 text-white/25">
      {icon}
      <span className="text-xs">{label}</span>
    </div>
  )
}