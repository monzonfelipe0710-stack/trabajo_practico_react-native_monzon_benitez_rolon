import { StyleSheet, Text, View } from "react-native";

export default function Acerca() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Acerca de</Text>
      <Text>Proyecto: Catálogo de Películas — Trabajo práctico React Native</Text>
      <Text>Integrantes: (añadir nombres aquí)</Text>
      <Text style={styles.parrafo}>
        Esta aplicación es un prototipo que demuestra navegación con expo-router,
        uso de datos mock y manejo de estados de carga y vacío. Los datos no
        provienen de un backend real.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 8 },
  titulo: { fontSize: 20, fontWeight: "bold" },
  parrafo: { marginTop: 8, lineHeight: 20 },
});
