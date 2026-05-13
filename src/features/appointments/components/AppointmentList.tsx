//import { useAppointments } from "../hooks/useAppointments"
import { Button } from "@/components/ui/button"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"



import type { Appointment } from "../types"
import { style } from "../types"


type Props = {
    appointments: Appointment[]
    cancelAppointment: (id: string) => void
}
export function AppointmentList({ appointments, cancelAppointment }: Props) {
    //const { appointments, cancelAppointment } = useAppointments()

    return (
        <>

            <div className="space-y-2 h-[70vh] overflow-y-scroll p-2" >
                {appointments?.map((a) => (
                    <div key={a.id} className="border p-3 rounded" style={style}>
                        <p><b>Doctor:</b> {a.doctor}</p>
                        <p><b>Paciente:</b> {a.paciente}</p>
                        <p><b>Fecha:</b>
                            {a.fecha && new Date(a.fecha).toLocaleString()}
                        </p>
                        
                        <div className="flex items-center gap-2">
                            {
                                a.status === "confirmado" ? (
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                                        <span className="text-sm text-green-600">
                                            Status: {a.status}
                                        </span>
                                    </div>
                                ) : null
                            }
                            {
                                a.status === "cancelado" ? (
                                    <div className="flex items-center gap-2">
                                        <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                                        <span className="text-sm text-red-600">
                                            Status: {a.status}
                                        </span>
                                    </div>
                                ) : null
                            }
                        </div>
                        
                        {a.status !== "cancelado" && (
                            <Button onClick={() => cancelAppointment(a.id)}>
                                Cancelar
                            </Button>
                            
                        )}
                        
                        <Dialog>
                            <DialogTrigger render={<Button variant="outline">Ver nota</Button>} />
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Notas</DialogTitle>
                                </DialogHeader>
                                <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
                                    {!a.notas ? "Sin notas" : a.notas}
                                </div>
                            </DialogContent>
                        </Dialog>
                        
                    </div>
                ))}
            </div>
        </>
    )
}