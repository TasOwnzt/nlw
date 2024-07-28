import { ComponentProps, FormEvent, ReactNode } from "react";
import { Button } from "./button";
import { X } from "lucide-react";

interface ModalProps extends ComponentProps<'div'> {
    closeModal: () => void,
    sendTo: (event:FormEvent<HTMLFormElement>) => void,
    description?: string | ReactNode,
    textTitle: string
    children: ReactNode
    textButton: string
}

export function Modal({
    children,
    closeModal,
    sendTo,
    description,
    textTitle,
    textButton
}: ModalProps) {
    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h2 className='text-lg font-semibold'>{textTitle}</h2>
                <button type='button' onClick={closeModal}>
                  <X className='size-5 text-zinc-400'/>
                </button>
              </div>
              <p className='text-sm text-zinc-400'>
                {description}
              </p>
            </div>
            <form onSubmit={sendTo} className='space-y-3'>
              {children}
              <Button type='submit' size="full">
                {textButton}
              </Button>
            </form>
          </div>
        </div>
    )
}