import React from 'react';
import { EVENTS_DATA } from '../data';

export default function EventsSection() {
  return (
    <section id="events" className="bg-[#F5EFE6] py-12 px-4 border-t border-[#E3D8C8]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-serif font-bold text-[#2C1D11] mb-6">Upcoming Events & Clubs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EVENTS_DATA.map(evt => (
            <div key={evt.id} className="bg-[#FDFBF7] p-5 rounded-lg border border-[#E3D8C8] flex gap-4">
              <div className="bg-[#C05A3E] text-white p-3 rounded font-bold text-center min-w-[70px] h-fit">
                <span className="block text-xs uppercase">{evt.date.split(' ')[0]}</span>
                <span className="text-lg">{evt.date.split(' ')[1]}</span>
              </div>
              <div>
                <h3 className="font-bold text-[#2C1D11]">{evt.title}</h3>
                <p className="text-xs text-[#C05A3E] font-medium mb-1">{evt.time}</p>
                <p className="text-xs text-[#6A584C]">{evt.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}