
import  type {  AppointmentBase  } from "../appointments/services/validation"

export type Appointment = AppointmentBase & {
    id: string
    status: "pendiente" | "confirmado" | "cancelado"
}

export const doctores = [

    { label: "Dra. Elena Santillán", value: "Elena Santillán" },
    { label: "Dr. Julián Valdivieso", value: "Julián Valdivieso" },
    { label: "Dra. Beatriz Riva", value: "Beatriz Riva" },
    { label: "Dr. Federico Lombardi", value: "Federico Lombardi" },
    { label: "Dr. Hugo Tello", value: "Hugo Tello" },
    { label: "Dra. Clara Inés", value: "Clara Inés" },
    { label: "Dr. Leo Castelli", value: "Leo Castelli" },
]



