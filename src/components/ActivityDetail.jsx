import { ChevronLeft } from "lucide-react";



export default function ActivityDetail({ activity, onBack }) {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 max-w-5xl">
        
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-blue-600 mb-6 hover:underline"
        >
          <ChevronLeft size={18} />
          Volver a actividades
        </button>

        <h2 className="text-3xl font-bold mb-4">{activity.titulo}</h2>
        <p className="text-slate-600 mb-8">{activity.descripcionLarga}</p>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {activity.imagenes && activity.imagenes.map((img, idx) => (
 
            <img
              key={idx}
              src={img}
              alt={`Actividad ${idx}`}
              className="rounded-xl shadow-md"
            />
          ))}
        </div>

        <div>
          <h4 className="font-bold text-lg mb-2">Integrantes</h4>
<ul className="list-disc list-inside text-slate-600">
  {activity.integrantes && activity.integrantes.map((int, idx) => (
    <li key={idx}>{int}</li>
  ))}
</ul>
        </div>

      </div>
    </section>
  );
}
