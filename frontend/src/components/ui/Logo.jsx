// e_trim: el archivo original tiene mucho margen transparente alrededor,
// esto recorta ese espacio vacío para que el logo llene bien su contenedor
const LOGO_URL =
  'https://res.cloudinary.com/dabikk5ei/image/upload/e_trim/v1787237623/logoOpticaAndina_fty1wa.png';

function Logo({ className = 'h-10 w-auto' }) {
  return <img src={LOGO_URL} alt="Óptica Andina" className={`${className} object-contain`} />;
}

export default Logo;
