import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";

interface ImportantsLinksProps {
    openCreateLinksModal: () => void,
    numberOfLinks: number
}

interface Link {
    id: string,
    title: string,
    url: string
}

export function ImportantsLinks ({
    openCreateLinksModal,
    numberOfLinks
}:ImportantsLinksProps) {
    const {tripId} = useParams()
    const [loadLinks, setLoadLinks] = useState<Link[]>([]);

    useEffect(() => {
        api.get(`/trips/${tripId}/links`).then((res) => setLoadLinks(res.data.links)) 
    }, [tripId, numberOfLinks]);

    return (
        <div className="space-y-6">
            <h2 className="font-semibold text-xl">Links Importantes</h2>
            <div className="space-y-5">
                {loadLinks.length > 0 &&
                    loadLinks.map(link => {
                        return (
                        <div key={link.id} className="flex items-center justify-between gap-4">
                            <div className="space-y-1.5">
                                <span className="block font-medium text-zinc-100">{link.title}</span>
                                <a href={link.url} target="_blank" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
                                    {link.url}
                                </a>
                            </div>
                            <Link2 className="text-zinc-400 size-5 shrink-0" />
                        </div>)
                    })
                }
            </div>
            <Button onClick={openCreateLinksModal} variant="secondary" size="full">
                <Plus className="size-5" />
                Cadastrar Link
            </Button>
        </div>
    )
}