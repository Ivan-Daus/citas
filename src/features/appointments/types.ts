
import type { AppointmentBase } from "../appointments/services/validation"

export type Appointment = AppointmentBase & {
    id: string
    status: "pendiente" | "confirmado" | "cancelado"
}

export const style = {
    backgroundColor: "#ffffff"
}

