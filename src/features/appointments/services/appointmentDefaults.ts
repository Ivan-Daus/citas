import type { AppointmentBase } from "../services/validation"

export const appointmentDefaultValues: AppointmentBase = {
    doctor: "",
    paciente: "",
    fecha: new Date,
    horaStart: "",
    horaEnd: "",
    notas: "",
    enfermedades: {
        Respiratorias: {
            "Resfriado común": [
                "Congestión nasal",
                "Estornudos",
                "Dolor de garganta",
                "Tos leve"
            ],
            "Gripe": [
                "Fiebre alta",
                "Dolor muscular",
                "Tos",
                "Fatiga"
            ],
            "COVID-19": [
                "Tos seca",
                "Fiebre",
                "Pérdida de olfato/gusto",
                "Dificultad para respirar"
            ],
            "Asma": [
                "Dificultad para respirar",
                "Silbidos en el pecho",
                "Tos nocturna"
            ]
        }
    }
}




