import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import Image from "next/image"

export function RecentSales({ events } : any) {
  return (
    <div className="space-y-8">
      {events.map((evt: any, i: number) => {
        return (
          <div key={`evt-${i}`} className="flex items-center">
            <Avatar className="h-9 w-9">
              <AvatarImage src={`/${evt.avatar}`} alt={evt.name} />
              <AvatarFallback>?</AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none">{evt.name}</p>
              <p className="text-sm text-muted-foreground">
                {evt.desc}
              </p>
            </div>
            <div className="ml-auto">
              <Image
                src={evt.icon ? `/${evt.icon}` : '/exam.png'}
                width={48}
                height={48}
                alt="Event"
                className="block"
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}
