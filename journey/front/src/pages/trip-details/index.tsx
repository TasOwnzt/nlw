import { Plus } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { CreateActivityModal } from "./create-activity-modal";
import { ImportantsLinks } from "./importants-links";
import { Guests } from "./guests";
import { Activities } from "./activities";
import { DestinationAndDateHeader } from "./destination-and-date-header";
import { Button } from "../../components/button";
import { CreateLinks } from "./create-links";
import { ManagerGuests } from "./manager-guests";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface InfoTrip {
    id: string,
    destination: string,
    starts_at: string,
    ends_at: string,
    is_confirmed: boolean
}

export function TripDetailsPage() {
    const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false)
    const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false)
    const [isManagerGuestsModalOpen, setIsManagerGuestsModalOpen] = useState(false)
    const [countActivities, setCountActivities] = useState<number>(0)
    const [countLinks, setCountLinks] = useState<number>(0)
    const [titleLink, setTitleLink] = useState<string>()
    const [url, setUrl] = useState<string>()
    const [nameGuest, setNameGuest] = useState<string>()
    const [emailGuest, setEmailGuest] = useState<string>()
    const [infoTrip, setInfoTrip] = useState<InfoTrip | undefined>()
    const [updateHeader, setUpdateHeader] = useState<boolean>(false)
    const {tripId} = useParams()

    const openCreateActivityModal = () => setIsCreateActivityModalOpen(true)
    const closeCreateActivityModal = () => setIsCreateActivityModalOpen(false)

    const closeCreateLinkModal = () => setIsCreateLinkModalOpen(false)
    const openCreateLinkModal = () => setIsCreateLinkModalOpen(true)

    const closeManagerGuests = () => setIsManagerGuestsModalOpen(false)
    const openManagerGuests = () => setIsManagerGuestsModalOpen(true)

    useEffect(() => {
        api.get(`/trips/${tripId}`).then(resp => setInfoTrip(resp.data.trip))
    }, [tripId, updateHeader])

    const saveGuest = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(!nameGuest) {
            return
        }

        if(!emailGuest) {
            return
        }

        // api.post(`/trips/${tripId}/links`, {
        //     title: titleLink,
        //     url
        // })
        console.log('salvo convidado')

        // Limpa os campos após salvar
        setNameGuest('')
        setEmailGuest('')

        closeManagerGuests()
    }

    const saveLink = (event:FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if(!url) {
            return
        }

        api.post(`/trips/${tripId}/links`, {
            title: titleLink,
            url
        })

        setCountLinks(countLinks + 1)

        // Limpa os campos após salvar os dados
        setTitleLink('')
        setUrl('')
    }

    return (
        <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
            <DestinationAndDateHeader updateHeader={setUpdateHeader} hasUpdate={updateHeader}/>

            <main className="flex gap-16 px-4">
                <div className="flex-1 space-y-6 select-none">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-semibold">Atividades</h2>
                        <Button onClick={openCreateActivityModal}>
                            <Plus className="size-5" />
                            Cadastrar Atividade
                        </Button>
                    </div>

                    <Activities
                        update={updateHeader}
                        countActivities={countActivities}
                    />
                </div>

                {/* Barra lateral */}
                <div className="w-80 space-y-6 select-none">
                    <ImportantsLinks
                        numberOfLinks={countLinks}
                        openCreateLinksModal={openCreateLinkModal}
                    />

                    <div className="w-full h-px bg-zinc-800" />

                    <Guests
                        openModal={openManagerGuests}
                    />
                </div>
            </main>

            {isCreateActivityModalOpen && (
                <CreateActivityModal
                    closeCreateActivityModal={closeCreateActivityModal}
                    setCountActivities={setCountActivities}
                    countActivities={countActivities}
                />
            )}

            {isCreateLinkModalOpen && 
                <CreateLinks
                    changeTitleLink={setTitleLink}
                    changeUrl={setUrl}
                    sendDataTo={saveLink}
                    closeCreateLinksModal={closeCreateLinkModal}
                />
            }

            {isManagerGuestsModalOpen && 
                <ManagerGuests
                    infoTrip={infoTrip}
                    changeNameGuest={setNameGuest}
                    changeEmailGuest={setEmailGuest}
                    sendTo={saveGuest}
                    closeModal={closeManagerGuests}
                />
            }
        </div>
    )
}