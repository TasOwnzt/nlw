import { CheckCircle2, CircleDashed, UserCog } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

interface GuestsProps {
    openModal: () => void
}

interface Participants {
    id: string,
    name: string | null,
    email: string,
    is_confirmed: boolean
}

export function Guests ({
    openModal
}:GuestsProps) {
    const {tripId } = useParams()
    const [participants, setParticipants] = useState<Participants[]>([])
    const Confirm = withReactContent(Swal)

    useEffect(() => {
        api.get(`/trips/${tripId}/participants`).then(response => setParticipants(response.data.participants))
    }, [tripId])

    const confirmInvite = (participantId: string) => {
        
        Confirm.fire({
            icon: 'question',
            html:<span>Deseja confirar a participação desse convidado?</span>,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Confirmar',
            showCancelButton: true,
            reverseButtons: true,
            customClass: {
                popup: 'bg-zinc-950 text-zinc-50',
                confirmButton: 'bg-lime-300 text-lime-950 hover:bg-lime-400',
                cancelButton: 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700',
            }
        }).then((res) => {
            if(res.isConfirmed) {
                console.log('clicou', participantId)
                // api.patch(`/participants/${participantId}/confirm`)
            }
        })
    }

    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Convidados</h2>
            <div className="space-y-5">
                { participants.map((participant, index) => (
                    <div key={participant.id} className="flex items-center justify-between gap-4">
                        <div className="space-y-1.5">
                            <span className="block font-medium text-zinc-100">{participant.name ?? `Convidado ${index}`}</span>
                            <span className="block text-xs text-zinc-400 truncate">
                                {participant.email}
                            </span>
                        </div>
                        {participant.is_confirmed ?  <CheckCircle2 className="text-green-400 size-5 shrink-0"/>: <CircleDashed className="text-zinc-400 size-5 shrink-0 cursor-pointer" onClick={() => confirmInvite(participant.id)}/>}
                    </div>
                ))}
            </div>
            <Button onClick={openModal} variant="secondary" size="full">
                <UserCog className="size-5" />
                Gerenciar Convidados
            </Button>
        </div>
    )
}