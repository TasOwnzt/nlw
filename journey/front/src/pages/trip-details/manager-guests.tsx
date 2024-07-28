import { Mail, User } from "lucide-react";
import { Modal } from "../../components/modal";
import { FormEvent } from "react";
import { format } from "date-fns";

interface InfoTrip {
    id: string,
    destination: string,
    starts_at: string,
    ends_at: string,
    is_confirmed: boolean
}

interface ManagerGuestsProps {
    closeModal: () => void,
    sendTo: (event:FormEvent<HTMLFormElement>) => void,
    changeNameGuest: (name: string) => void,
    changeEmailGuest: (email: string) => void,
    infoTrip: InfoTrip
}

export function ManagerGuests ({
    closeModal,
    sendTo,
    changeNameGuest,
    changeEmailGuest,
    infoTrip
}:ManagerGuestsProps) {
    return (
        <Modal
            closeModal={closeModal}
            sendTo={sendTo}
            textButton="Confirmar Minha Presença"
            textTitle="Confirmar Participação"
            description={
                <>
                <div className="space-y-6">
                    <div>Você foi convidado(a) para participar de uma viagem para <span className='font-semibold text-zinc-100'>{infoTrip.destination}, Brasil</span> nas datas de <span className='font-semibold text-zinc-100'>{format(infoTrip.starts_at, "d' de 'LLL").concat(' até ').concat(format(infoTrip.ends_at, "d' de 'LLL"))}</span>.</div>
                    <div>Para confirmar sua presença na viagem, preencha os dados abaixo:</div>
                </div>
                </>
            }
        >
            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <User className='text-zinc-400 size-5'/>
                <input
                    onChange={(event) => changeNameGuest(event.target.value)}
                    name='name'
                    placeholder="Seu nome completo"
                    className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"/>
            </div>
            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <Mail className='text-zinc-400 size-5'/>
                <input
                    onChange={(event) => changeEmailGuest(event.target.value)}
                    type="email"
                    name='email'
                    placeholder="Seu e-mail"
                    className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"/>
            </div>
        </Modal>
    )
}