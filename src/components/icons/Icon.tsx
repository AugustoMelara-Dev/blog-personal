import { LucideProps } from 'lucide-react'
import * as Icons from 'lucide-react'

interface IconProps extends LucideProps {
  name: keyof typeof Icons
}

export default function Icon({ name, ...props }: IconProps) {
  const LucideIcon = Icons[name] as React.FC<LucideProps>
  if (!LucideIcon) return null
  return <LucideIcon {...props} />
}
