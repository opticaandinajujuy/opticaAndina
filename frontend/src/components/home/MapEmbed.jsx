import { contactContent } from '../../data/contactContent.js';

function MapEmbed() {
  const query = encodeURIComponent(contactContent.address);

  return (
    <div className="overflow-hidden rounded-2xl border border-sage-100">
      <iframe
        title="Ubicación de Óptica Andina"
        src={`https://maps.google.com/maps?q=${query}&z=16&output=embed`}
        className="h-72 w-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

export default MapEmbed;
