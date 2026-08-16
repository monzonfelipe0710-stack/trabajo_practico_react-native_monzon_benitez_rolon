import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import { tema } from "./tema";

export default function Acerca() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.content}>
        <Text style={styles.titulo}>Acerca de</Text>
        <Text style={styles.destacado}>
          TopFilms — Catálogo de Películas (Trabajo práctico React Native)
        </Text>
        <Text style={styles.parrafo}>Integrantes:</Text>
        <Text style={styles.item}>- Rolón Agustín</Text>
        <Text style={styles.item}>- Benitez Gonzalo</Text>
        <Text style={styles.item}>- Monzón Felipe</Text>
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
  container: { flex: 1, backgroundColor: tema.colores.fondo },
  content: { padding: tema.espaciados.mediano },
  titulo: {
    fontSize: 26,
    fontWeight: "800",
    color: tema.colores.texto,
    marginBottom: tema.espaciados.mediano,
  },
  destacado: {
    fontSize: 15,
    fontWeight: "700",
    color: tema.colores.texto,
    marginBottom: tema.espaciados.mediano,
  },
  parrafo: {
    marginTop: tema.espaciados.chico,
    lineHeight: 22,
    color: "#444444",
    fontSize: 14,
  },
  item: { color: tema.colores.textoSuave, lineHeight: 24 },
});
