import { z } from "zod"

export const appointmentSchema = z.object({
    doctor: z
    .string()
    .min(1, "Selecciona un doctor")
    .refine((val) => val !== "doc1", {
        message: "Este doctor no está disponible"
    }),
    paciente: z
    .string()
    .min(3, "Mínimo 3 caracteres")
    .max(20, "Máximo 20 caracteres"),
    fecha: z
    .date()
    .optional()
    .refine((val) => val !== undefined, {
        message: "Selecciona una fecha"
    }),
    hora: z
    .string()
    .min(1, "Selecciona una hora")
    .refine((hora) => {
        const [h] = hora.split(":").map(Number)
        return h >= 9 && h < 18
    }, {
        message: "Horario fuera de atención (9-18)"
    })
})

export type AppointmentBase  = z.infer<typeof appointmentSchema>