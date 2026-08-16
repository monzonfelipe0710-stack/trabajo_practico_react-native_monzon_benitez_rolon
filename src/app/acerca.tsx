import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";

export default function Acerca() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.titulo}>Acerca de</Text>
        <Text style={{ color: '#fff' }}>Proyecto: TopFilms — Catálogo de Películas (Trabajo práctico React Native)</Text>
        <Text style={styles.parrafo}>Integrantes:</Text>
        <Text style={{ color: '#fff' }}>- Rolón Agustín</Text>
        <Text style={{ color: '#fff' }}>- Benitez Gonzalo</Text>
        <Text style={{ color: '#fff' }}>- Monzón Felipe</Text>
        <Text style={styles.parrafo}>
          Esta aplicación es un prototipo que demuestra navegación con expo-router,
          uso de datos mock y manejo de estados de carga y vacío. Los datos no
          provienen de un backend real.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0b0b' },
  content: { padding: 16 },
  titulo: { fontSize: 20, fontWeight: "bold", color: '#fff' },
  parrafo: { marginTop: 8, lineHeight: 20, color: '#ddd' },
});
