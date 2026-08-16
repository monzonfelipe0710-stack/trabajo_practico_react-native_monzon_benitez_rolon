import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ProveedorTema, useTema } from "./tema";

export default function LayoutRaiz() {
  return (
    <ProveedorTema>
      <Navegacion />
    </ProveedorTema>
  );
}

function Navegacion() {
  const { modo } = useTema();

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ title: "TopFilms" }} />
        <Stack.Screen
          name="detalle/[id]"
          options={{ title: "Detalle de película" }}
        />
        <Stack.Screen name="agregar" options={{ title: "Agregar película" }} />
        <Stack.Screen name="acerca" options={{ title: "Acerca de" }} />
      </Stack>
      <StatusBar style={modo === "oscuro" ? "light" : "dark"} />
    </>
  );
}
