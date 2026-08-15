import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function LayoutRaiz() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Películas" }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
