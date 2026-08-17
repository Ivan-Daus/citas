import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { ChevronDownIcon } from "lucide-react"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"

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

import type { Appointment } from "../types"
import { useForm } from "react-hook-form"
import type { SubmitHandler } from "react-hook-form"
import { Controller } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { appointmentSchema } from "../services/validation"
import type { AppointmentBase } from "../services/validation"
import { style } from "../types"
import { appointmentDefaultValues } from "../services/appointmentDefaults"



type Props = {
    addAppointment: (a: Appointment) => void
    doctorName:any
}

export function AppointmentForm({ addAppointment,doctorName }: Props) {

    const [open, setOpen] = React.useState(false)
    
    const { register, handleSubmit, control, formState: { errors },reset } = useForm<AppointmentBase>({
        resolver: zodResolver(appointmentSchema),
        defaultValues: appointmentDefaultValues
    })
    
    const onSubmit: SubmitHandler<AppointmentBase> = (data) => {
        alert("Cita creada")
        const nuevaCita: Appointment = {
            ...data,
            id: crypto.randomUUID(),
            status: "confirmado"
        }
        addAppointment(nuevaCita)
        console.log(nuevaCita)
        reset();
    }
    
    return (
        <>
            <div className="rounded-sm shadow-lg p-3" style={style}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <FieldGroup className="grid grid-cols-4 xl:grid-cols-12">
                        <Field className="col-span-4 xl:col-span-2">
                            <FieldLabel htmlFor="date-picker-optional">Fecha</FieldLabel>
                            
                            <Controller name="fecha" control={control}
                                
                                render={({ field }) => (
                                    
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger
                                            render={
                                                <Button variant="outline" className="w-full justify-between font-normal">
                                                    {field.value ? format(field.value, "PP") : "Selecciona"} <ChevronDownIcon />
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
                        
                        <Field className="col-span-2 xl:col-span-2">
                            <FieldLabel htmlFor="time-picker-optional">Hora inicio</FieldLabel>
                            <Input
                                type="time"
                                step="60"
                                className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                {...register("horaStart")}
                            />
                            {errors.horaStart && (
                                <p className="text-red-500 text-sm">
                                    {errors.horaStart.message}
                                </p>
                            )}
                        </Field>
                        <Field className="col-span-2 xl:col-span-2">
                            <FieldLabel htmlFor="time-picker-optional">Hora fin</FieldLabel>
                            <Input
                                type="time"
                                step="60"
                                className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
                                {...register("horaEnd")}
                            />
                            {errors.horaEnd && (
                                <p className="text-red-500 text-sm">
                                    {errors.horaEnd.message}
                                </p>
                            )}
                        </Field>
                        <Field className="col-span-2 xl:col-span-2">
                            <FieldLabel>Nombre del doctor</FieldLabel>
                            
                            <Controller name="doctor" control={control}
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
                                                    doctorName.map((item:any) => (
                                                        <SelectItem key={item.id.value} value={ item.name.first + " " + item.name.last}>
                                                            {item.gender === "male" ? "Dr " +  item.name.first + " " + item.name.last : 
                                                            "Dra " +  item.name.first + " " + item.name.last +  " " + item.id.name }
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
                        <Field className="col-span-2">
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
                        <Field className="col-span-4 xl:col-span-2">
                            <FieldLabel>Sintomas / Notas</FieldLabel>
                            <Textarea className="w-full" placeholder="Notas." {...register("notas")}/>
                            {
                                errors.notas && (
                                    <p className="text-red-500">{errors.notas.message}</p>
                                )
                            }
                        </Field>
                    </FieldGroup>
                    <div className="col-span-4 xl:col-span-3">
                        <Button type="submit" className="m-3 w-9/10 xl:w-80">Crear cita</Button>
                    </div>
                </form>
            </div>
        </>
    )
}



