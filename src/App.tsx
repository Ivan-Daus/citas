import { useEffect, useState } from "react"

import { Api } from "./service/apiKey"
import { NormaliceUser } from "./normalice/apiKey-Normalice"

import { AppointmentForm } from "@/features/appointments/components/AppointmentForm"
import { AppointmentList } from "@/features/appointments/components/AppointmentList"

import { useAppointments } from "@/features/appointments/hooks/useAppointments"


interface Doctor {
  email: string;
  cell: string;
  gender: string;
  id: Number | string; 
  location: any;
  name: { title: string; first: string; last: string };
  phone: string;
  picture: { large: string; medium: string; thumbnail: string };
  registered: any;
}

export default function AppointmentsPage() {
  const { appointments,addAppointment, cancelAppointment } = useAppointments()
  const [dataDoctor,setDataDoctor] = useState<Doctor[]>([]);
  
  useEffect(()=>{
    
    async function ConsumeApi(){
      const dataNormalice = NormaliceUser(await Api());
      setDataDoctor(dataNormalice)
    }
    ConsumeApi();
  },[])
  console.log(dataDoctor)
  
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-4xl uppercase font-bold">agendar cita</h1>
      <AppointmentForm addAppointment={addAppointment} doctorName={dataDoctor} />
      
      <AppointmentList appointments={appointments} cancelAppointment={cancelAppointment}/>
      
    </div>
  );
}