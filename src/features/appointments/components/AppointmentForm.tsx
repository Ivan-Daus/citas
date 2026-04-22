import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { doctores } from "../types"
import type { Appointment } from "../types"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { Controller } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { appointmentSchema } from "../services/validation"
import type { AppointmentBase } from "../services/validation"

type Props = {
    addAppointment: (a: Appointment) => void
}


export function AppointmentForm({ addAppointment }: Props) {

    const [open, setOpen] = React.useState(false)
    
    const { register, handleSubmit, control, formState: { errors } } = useForm<AppointmentBase>({
        resolver: zodResolver(appointmentSchema),
        defaultValues: {
            doctor: "",
            paciente: "",
            fecha: undefined,
            hora: ""
        }
    })


    const onSubmit: SubmitHandler<AppointmentBase> = (data) => {

        const nuevaCita: Appointment = {
            ...data,
            fecha: data.fecha, // ya validada
            id: crypto.randomUUID(),
            status: "confirmado"
        }

        addAppointment(nuevaCita)
        
    }

    return (
        <>
            <div className="bg-white rounded-sm shadow p-3">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <FieldGroup className="grid grid-cols-12 ">
                        <Field className="col-span-3">

                            <FieldLabel htmlFor="date-picker-optional">Fecha</FieldLabel>

                            <Controller name="fecha" control={control}
                                rules={{
                                    required: "Selecciona una fecha",
                                    validate: (value) => {
                                        if (!value) return "Fecha inválida"

                                        const hoy = new Date()
                                        hoy.setHours(0, 0, 0, 0)

                                        if (value < hoy) {
                                            return "No puedes seleccionar una fecha pasada"
                                        }

                                        return true
                                    }
                                }}
                                render={({ field }) => (
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger
                                            render={
                                                <Button variant="outline" className="w-full justify-between font-normal">
                                                    {field.value ? format(field.value, "PPP") : "Selecciona"} <ChevronDownIcon />
                                                </Button>
                                            } />

                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={field.value ?? undefined}
                                                onSelect={(date) => {
                                                    field.onChange(date ?? null)
                                                    setOpen(false)
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                )} />
                            {errors.fecha && (
                                <p className="text-red-500 text-sm">
                                    {errors.fecha.message}
                                </p>
                            )}
                        </Field>

                        <Field className="col-span-3">
                            <FieldLabel htmlFor="time-picker-optional">Hora</FieldLabel>
                            <Input
                                type="time"
                                step="60"
                                className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                {...register("hora", {
                                    required: "Selecciona una hora",
                                    validate: (value) => {
                                        const [h] = value.split(":").map(Number)
                                        if (h < 9 || h >= 18) {
                                            return "Horario fuera de atención (9:00 - 18:00)"
                                        }
                                        return true
                                    }
                                })}
                            />
                            {errors.hora && (
                                <p className="text-red-500 text-sm">
                                    {errors.hora.message}
                                </p>
                            )}
                        </Field>
                        <Field className="col-span-3">
                            <FieldLabel>Nombre del doctor</FieldLabel>

                            <Controller name="doctor" control={control} rules={{
                                required: "Selecciona un doctor",
                                validate: (value) =>
                                    value !== "doc1" || "Este doctor no esta disponible"
                            }}
                                render={({ field }) => (
                                    <Select value={field.value ?? ""} onValueChange={(value) =>
                                        field.onChange(value ?? "")
                                    }>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona doctor" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Dooctor</SelectLabel>
                                                {
                                                    doctores.map((item) => (
                                                        <SelectItem key={item.value} value={item.value}>
                                                            {item.label}
                                                        </SelectItem>
                                                    ))
                                                }
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                )} />
                            {errors.doctor && (
                                <p className="text-red-500 text-sm">
                                    {errors.doctor.message}
                                </p>
                            )}
                        </Field>

                        <Field className="col-span-3">
                            <FieldLabel>Nombre del paciente</FieldLabel>
                            <Input placeholder="Paciente" {...register("paciente", {
                                required: "El paciente es obligatorio",
                                minLength: {
                                    value: 3,
                                    message: "Minimo 3 caracteres"
                                }
                            })} />
                            {
                                errors.paciente && (
                                    <p className="text-red-500">{errors.paciente.message}</p>
                                )
                            }
                        </Field>
                    </FieldGroup>
                    <Button type="submit" className="m-3">Crear cita</Button>
                </form>
            </div>
        </>
    )
}



