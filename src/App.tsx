import { AppointmentForm } from "@/features/appointments/components/AppointmentForm"
import { AppointmentList } from "@/features/appointments/components/AppointmentList"
import { useAppointments } from "@/features/appointments/hooks/useAppointments"

export default function AppointmentsPage() {
  const { appointments,addAppointment, cancelAppointment } = useAppointments()

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      <h1 className="text-4xl uppercase font-bold">agendar cita</h1>
      <AppointmentForm addAppointment={addAppointment} />
      <AppointmentList  appointments={appointments}
        cancelAppointment={cancelAppointment}/>
    </div>
  )
}