import { useState, useEffect } from "react"
import { getAppointments, saveAppointments } from "../services/appointmentsService"
import type { Appointment } from "../types"

export function useAppointments() {
    const [appointments, setAppointments] = useState<Appointment[]>([])

    useEffect(() => {
        setAppointments(getAppointments())
    }, [])
    
    const addAppointment = (newAppointment: Appointment) => {
        const exists = appointments.some(
            (a) =>
                a.fecha === newAppointment.fecha &&
                a.doctor === newAppointment.doctor
        )
        
        if (exists) {
            alert("ESTE HORARIO YA ESTA OCUPADO")
            return
        }
        
        const updated = [...appointments, newAppointment]
        setAppointments(updated)
        saveAppointments(updated)
    }

    const cancelAppointment = (id: string) => {
        const updated: Appointment[] = appointments.map((a) =>
            a.id === id
                ? { ...a, status: "cancelado"  }
                : a
        )
        
        setAppointments(updated)
        saveAppointments(updated)
    }
    
    return {
        appointments,
        addAppointment,
        cancelAppointment,
    }
}