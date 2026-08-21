// e_trim: el archivo original tiene mucho margen transparente alrededor,
// esto recorta ese espacio vacío para que el logo llene bien su contenedor
const LOGO_URL =
  'https://res.cloudinary.com/wf4comu9/image/upload/e_trim/v1787326282/optica-andina/assets/fjs7nlbeuckarv76mpnr.png';

function Logo({ className = 'h-10 w-auto' }) {
  return <img src={LOGO_URL} alt="Óptica Andina" className={`${className} object-contain`} />;
}

export default Logo;
