import feliz from '../../assets/mascota/Feliz.png';
import sorprendido from '../../assets/mascota/Sorprendido.png';
import triste from '../../assets/mascota/Triste.png';
import ensenando from '../../assets/mascota/Enseñando.png';

export type EstadoLex = 'feliz' | 'sorprendido' | 'triste' | 'ensenando';

const IMAGENES: Record<EstadoLex, string> = {
  feliz,
  sorprendido,
  triste,
  ensenando,
};

const TAMAÑOS = { sm: 64, md: 110, lg: 240 };

interface Props {
  estado?: EstadoLex;
  mensaje?: string;
  tamaño?: 'sm' | 'md' | 'lg';
  onCerrar?: () => void;
}

export default function MascotaLex({
  estado = 'feliz',
  mensaje,
  tamaño = 'md',
  onCerrar,
}: Props) {
  const px = TAMAÑOS[tamaño];

  return (
    <div className="flex items-end gap-3">
      <img
        src={IMAGENES[estado]}
        alt={`Lex ${estado}`}
        style={{ width: px, height: px, objectFit: 'contain' }}
        className="drop-shadow-md flex-shrink-0"
      />
      {mensaje && (
        <div className="relative bg-white border border-[#d8e9f5] rounded-2xl rounded-bl-none shadow-sm px-5 py-4 max-w-sm">
          {onCerrar && (
            <button
              onClick={onCerrar}
              className="absolute -top-2 -right-2 w-5 h-5 bg-[#9ac1e2] hover:bg-[#2a628f] text-white rounded-full text-xs flex items-center justify-center transition-colors"
              aria-label="Cerrar"
            >
              ×
            </button>
          )}
          <p className="text-base text-[#1e293b] leading-snug">{mensaje}</p>
          {/* pico de burbuja */}
          <span className="absolute -bottom-2 left-4 w-3 h-3 bg-white border-b border-l border-[#d8e9f5] rotate-[-45deg]" />
        </div>
      )}
    </div>
  );
}
