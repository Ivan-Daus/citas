import { number, string, z } from "zod"

import {  doctorOptions  } from "../types"

export const appointmentSchema = z.object({

    fecha: z
        .date()
        .refine((val) => val !== undefined, {
            message: "Selecciona una fecha"
        })
        .refine((value) => {
            if (!value) return false
            const hoy = new Date()
            hoy.setHours(0, 0, 0, 0)
            return value >= hoy
        }, {
            message: "No puedes seleccionar una fecha pasada"
        }),


    horaStart: z
        .string()
        .min(1, "Selecciona una hora")
        .refine((hora) => {
            const [h] = hora.split(":").map(Number)
            return h >= 9 && h < 18
        }, {
            message: "Horario fuera de atención (9-18)"
        }),

    horaEnd: z
        .string()
        .min(1, "Selecciona una hora")
        .refine((hora) => {
            const [h] = hora.split(":").map(Number)
            return h >= 9 && h < 18
        }, {
            message: "Horario fuera de atención (9-18)"
        }),

    doctor: z
        .enum(doctorOptions,{
            message:"Selecciona un doctor"
        }),

    paciente: z
        .string()
        .min(3, "Mínimo 3 caracteres")
        .max(20, "Máximo 20 caracteres"),

    notas: z
        .string()
        .min(3, "Mínimo 3 caracteres")
        .nonempty("Escribe una nota"),

    enfermedades: z.object({
        Respiratorias: z.object({
            "Resfriado común": z.array(z.string()),
            "Gripe": z.array(z.string()),
            "COVID-19": z.array(z.string()),
            "Asma": z.array(z.string())
        })
    })
})
    .superRefine((data, ctx) => {
        console.log("deee")
        const [startH, startM] = data.horaStart.split(":").map(Number)
        const [endH, endM] = data.horaEnd.split(":").map(Number)

        const startTotal = startH * 60 + startM
        const endTotal = endH * 60 + endM
        
        if (data.horaEnd <= data.horaStart) {
            ctx.addIssue({
                code: "custom",
                path: ["horaEnd"],
                message: "La hora fin debe ser mayor que la hora inicio"
            })
        }   

        if (endTotal - startTotal < 20) {
            ctx.addIssue({
                code: "custom",
                path: ["horaEnd"],
                message: "Debe haber al menos 20 minutos de la cita"
            })
        }
    })

export type AppointmentBase = z.infer<typeof appointmentSchema>