"use client"

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export default function Calendar({ events, students } : { events: Array<any>,  students: Array<any> }) {

    const allExams = events?.map((evt) => {
        return {
            title: `${evt.Subject.name} - ${evt.StudentYear.Student.name}`,
            start: evt.date,
            end: evt.date,
            resourceId: 1,
            allDay: true,
            color: evt.StudentYear.color,
        }
    })
    const allBirthdays = students?.filter((student: any) => student.Student.birthday !== null).map((evt) => {
        return {
            title: `🎉 ${evt.Student.name}`,
            start: `${new Date().getFullYear()}-${("0" + (evt.Student.birthday.getMonth() + 1)).slice(-2)}-${("0" + evt.Student.birthday.getDate()).slice(-2)}`,
            end: `${new Date().getFullYear()}-${("0" + (evt.Student.birthday.getMonth() + 1)).slice(-2)}-${("0" + evt.Student.birthday.getDate()).slice(-2)}`,
            resourceId: 2,
            allDay: true,
            color: '#FFBF00',
        }
    })
    
    return (
        <FullCalendar
            plugins={[ dayGridPlugin ]}
            initialView='dayGridMonth'
            weekends={false}
            locale={"pt-PT"}
            headerToolbar={{
                left: '',
                center: 'title',
                right: 'prev,next'
            }}
            events={[...allBirthdays, ...allExams] || []}
        />
    )
}