import { ArrowRight, Calendar, MapPin, Settings2, X } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { api } from "../../lib/axios";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { DateRange, DayPicker } from "react-day-picker";

interface Trip {
    id: string,
    destination: string,
    starts_at: string,
    ends_at: string,
    is_confirmed: boolean
}

interface DestinationAndDateHeaderProps {
    updateHeader: (ok: boolean) => void,
    hasUpdate: boolean
}

export function DestinationAndDateHeader ({
    updateHeader,
    hasUpdate
}:DestinationAndDateHeaderProps) {
    const {tripId } = useParams()
    const [trip, setTrip] = useState<Trip | undefined>()
    const [isChangeDateHour, setIsChangeDateHour] = useState(false)
    const [changeDestination, setChangeDestination] = useState<string>('')
    const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

    useEffect(() => {
        api.get(`/trips/${tripId}`).then(response => setTrip(response.data.trip))
    }, [tripId, hasUpdate])

    let displayedDate = trip ? 
    format(trip.starts_at, "d' de 'LLL").concat(' até ').concat(format(trip.ends_at, "d' de 'LLL")) : null

    const openDataPicker = () => setIsDatePickerOpen(true)
    const closeDataPicker = () => setIsDatePickerOpen(false)

    const changeDateHour = async () => {
        if(!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
            return
        }

        await api.put(`/trips/${tripId}`, {
            destination: changeDestination,
            starts_at: eventStartAndEndDates?.from,
            ends_at: eventStartAndEndDates?.to
        })

        displayedDate = format(eventStartAndEndDates?.from, "d' de 'LLL").concat(' até ').concat(format(eventStartAndEndDates?.to, "d' de 'LLL"))

        setIsChangeDateHour(false)
        closeDataPicker()

        updateHeader(true)
        // location.reload()
    }

    return (
        <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
            <div className="flex items-center gap-2 flex-1 pe-5">
                <MapPin className="size-5 text-zinc-400"/>
                {isChangeDateHour? (
                    <input type="text" placeholder="Para onde você vai?" className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                        onChange={(event) => setChangeDestination(event.target.value)}/>):
                    <span className="text-zinc-100 select-none">{changeDestination || trip?.destination }</span>
                }
            </div>

            <div className="flex items-center gap-5">
                <button disabled={!isChangeDateHour} onClick={openDataPicker} className="flex items-center gap-2 text-left w-[220px]">
                    <Calendar className="size-5 text-zinc-400"/>
                    <span className="text-zinc-100">
                        {displayedDate}
                    </span>
                </button>

                {isDatePickerOpen && (
                    <div className="absolute top-24 bg-transparent flex items-center justify-center">
                        <div className='rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                            <h2 className='text-lg font-semibold'>Selecione a data</h2>
                            <button type='button' onClick={closeDataPicker}>
                                <X className='size-5 text-zinc-400'/>
                            </button>
                            </div>
                        </div>
                        <DayPicker mode="range"
                            selected={eventStartAndEndDates}
                            onSelect={setEventStartAndEndDates}
                        />
                        </div>
                    </div>
                )}

                <div className="w-px h-6 bg-zinc-800" />

                {isChangeDateHour?
                <Button onClick={changeDateHour} variant="primary" size="alt">
                    Salvar
                    <ArrowRight className="size-5" />
                </Button>:
                <Button onClick={() => setIsChangeDateHour(true)} variant="secondary">
                    Alterar Local/Data
                    <Settings2 className="size-5" />
                </Button>
                }
            </div>
        </div>
    )
}