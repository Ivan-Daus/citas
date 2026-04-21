import type { Appointment } from "../types"

const KEY = "appointments"

export const getAppointments = (): Appointment[] => {
    const data = localStorage.getItem(KEY)
    if (!data) return []
    
    try {
        return JSON.parse(data) as Appointment[]
    } catch {
        return []
    }
}

export const saveAppointments = (data: Appointment[]) => {
    localStorage.setItem(KEY, JSON.stringify(data))
}