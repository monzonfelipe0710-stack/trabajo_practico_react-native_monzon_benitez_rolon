import { useState } from "react";
import { ActivityIndicator, Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useRouter } from "expo-router";

import { agregarPelicula } from "@/services/peliculas";

export default function AgregarPelicula() {
  const router = useRouter();
  const [titulo, setTitulo] = useState("");
  const [genero, setGenero] = useState("");
  const [anio, setAnio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function validar() {
    if (!titulo.trim() || !genero.trim() || !anio.trim()) {
      Alert.alert("Campos obligatorios", "Título, género y año son obligatorios");
      return false;
    }
    const n = Number(anio);
    if (Number.isNaN(n) || n <= 1800) {
      Alert.alert("Año inválido", "Ingrese un año válido");
      return false;
    }
    return true;
  }

  async function onSubmit() {
    if (!validar()) return;
    setSubmitting(true);
    try {
      await agregarPelicula({ titulo: titulo.trim(), genero: genero.trim(), anio: Number(anio), descripcion: descripcion.trim() });
      router.push("/");
    } catch (e) {
      Alert.alert("Error", "No se pudo agregar la película");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título</Text>
      <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} />

      <Text style={styles.label}>Género</Text>
      <TextInput style={styles.input} value={genero} onChangeText={setGenero} />

      <Text style={styles.label}>Año</Text>
      <TextInput style={styles.input} value={anio} onChangeText={setAnio} keyboardType="numeric" />

      <Text style={styles.label}>Descripción</Text>
      <TextInput style={[styles.input, styles.multiline]} value={descripcion} onChangeText={setDescripcion} multiline numberOfLines={4} />

      {submitting ? <ActivityIndicator /> : <Button title="Agregar" onPress={onSubmit} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 8 },
  label: { fontWeight: "600" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 6 },
  multiline: { minHeight: 80, textAlignVertical: "top" },
});
