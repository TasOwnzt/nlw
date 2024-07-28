import { FormEvent } from "react";
import { Modal } from "../../components/modal";
import { Link2, Tag } from "lucide-react";

interface CreateLinksProps {
    sendDataTo: (event:FormEvent<HTMLFormElement>) => void,
    closeCreateLinksModal: () => void,
    changeTitleLink: (title: string) => void,
    changeUrl: (url: string) => void,
}

export function CreateLinks ({
    sendDataTo,
    closeCreateLinksModal,
    changeTitleLink,
    changeUrl,
} : CreateLinksProps) {
    return (
        <Modal
            closeModal={closeCreateLinksModal}
            sendTo={sendDataTo}
            textTitle="Cadastrar Link"
            textButton="Salvar Link"
            description="Todos convidados podem visualizar os links importantes"
        >
            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <Tag className='text-zinc-400 size-5 shrink-0'/>
                <input
                    onChange={(event) => changeTitleLink(event.target.value)}
                    name='tag'
                    placeholder="Titulo do link"
                    className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"/>
            </div>
            <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
                <Link2 className='text-zinc-400 size-5 shrink-0'/>
                <input
                    onChange={(event) => changeUrl(event.target.value)}
                    type="url"
                    name='url'
                    placeholder="URL"
                    className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none flex-1"/>
            </div>
        </Modal>
    )
}