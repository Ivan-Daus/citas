//import { useAppointments } from "../hooks/useAppointments"
import { Button } from "@/components/ui/button"
import type { Appointment } from "../types"

type Props = {
    appointments: Appointment[]
    cancelAppointment: (id: string) => void
}
export function AppointmentList({ appointments, cancelAppointment }: Props) {
    //const { appointments, cancelAppointment } = useAppointments()
    
    return (
        <div className="space-y-2">
            {appointments?.map((a) => (
                <div key={a.id} className="border p-3 rounded">
                    <p><b>Doctor:</b> {a.doctor}</p>
                    <p><b>Paciente:</b> {a.paciente}</p>
                    <p><b>Fecha:</b> 
                        {  a.fecha &&  new Date(a.fecha).toLocaleString()   }
                    </p>
                    <p><b>Estado:</b> {a.status}</p>
                    
                    {a.status !== "cancelado" && (
                        <Button onClick={() => cancelAppointment(a.id)}>
                            Cancelar
                        </Button>
                    )}
                    
                </div>
            ))}
        </div>
    )
}