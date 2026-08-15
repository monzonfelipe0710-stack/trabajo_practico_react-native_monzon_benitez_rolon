import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function LayoutRaiz() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Películas" }} />
        <Stack.Screen
          name="detalle/[id]"
          options={{ title: "Detalle de película" }}
        />
        <Stack.Screen name="agregar" options={{ title: "Agregar película" }} />
        <Stack.Screen name="acerca" options={{ title: "Acerca de" }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
