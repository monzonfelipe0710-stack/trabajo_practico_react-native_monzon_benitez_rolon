import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";

export type ModoTema = "claro" | "oscuro";

const coloresClaros = {
  fondo: "#f4f1ed",
  texto: "#171717",
  textoSuave: "#726e69",
  fondoInput: "#ebe7e2",
  borde: "#ddd7d0",
  botonPrimario: "#ef5b45",
  textoBotonPrimario: "#ffffff",
  botonSecundario: "#ded8d1",
  acento: "#ef5b45",
  fondoOscuro: "#171717",
  textoSobreOscuro: "#fffaf5",
  acentoSuave: "#f6c1a9",
};

const coloresOscuros = {
  fondo: "#111111",
  texto: "#fffaf5",
  textoSuave: "#b5ada5",
  fondoInput: "#262321",
  borde: "#403b37",
  botonPrimario: "#ef5b45",
  textoBotonPrimario: "#ffffff",
  botonSecundario: "#35302c",
  acento: "#ff8a70",
  fondoOscuro: "#080808",
  textoSobreOscuro: "#fffaf5",
  acentoSuave: "#f6c1a9",
};

export const tema = {
  colores: coloresClaros,
  radios: {
    boton: 999,
    tarjeta: 12,
    imagen: 10,
  },
  espaciados: {
    chico: 8,
    mediano: 16,
    grande: 24,
  },
};

type ColoresTema = typeof coloresClaros;

type TemaContexto = {
  modo: ModoTema;
  colores: ColoresTema;
  alternarModo: () => void;
};

const TemaContext = createContext<TemaContexto>({
  modo: "claro",
  colores: coloresClaros,
  alternarModo: () => undefined,
});

const TEMA_STORAGE_KEY = "topfilms_modo_tema";

export function ProveedorTema({ children }: { children: ReactNode }) {
  const [modo, setModo] = useState<ModoTema>("claro");

  useEffect(() => {
    AsyncStorage.getItem(TEMA_STORAGE_KEY).then((valor) => {
      if (valor === "claro" || valor === "oscuro") setModo(valor);
    });
  }, []);

  function alternarModo() {
    setModo((actual) => {
      const siguiente = actual === "claro" ? "oscuro" : "claro";
      AsyncStorage.setItem(TEMA_STORAGE_KEY, siguiente);
      return siguiente;
    });
  }

  return React.createElement(
    TemaContext.Provider,
    {
      value: {
        modo,
        colores: modo === "claro" ? coloresClaros : coloresOscuros,
        alternarModo,
      },
    },
    children,
  );
}

export function useTema() {
  return useContext(TemaContext);
}
