import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function AprendizajeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Centro de Aprendizaje</Text>

      <View style={styles.opcionesContainer}>
        {/* OPICIÓN 1: Idiomas */}
        <TouchableOpacity style={styles.tarjeta}>
          <View style={styles.iconoContainer}>
            <FontAwesome name="language" size={32} color="#1E90FF" />
          </View>
          <View style={styles.textosContainer}>
            <Text style={styles.textoTarjeta}>Idiomas</Text>
            <Text style={styles.subtextoTarjeta}>
              Japonés N4, vocabulario, gramática...
            </Text>
          </View>
          <FontAwesome name="chevron-right" size={16} color="#ccc" />
        </TouchableOpacity>

        {/* OPICIÓN 2: Programación */}
        <TouchableOpacity style={styles.tarjeta}>
          <View style={styles.iconoContainer}>
            <FontAwesome name="code" size={32} color="#1E90FF" />
          </View>
          <View style={styles.textosContainer}>
            <Text style={styles.textoTarjeta}>Programación</Text>
            <Text style={styles.subtextoTarjeta}>
              Desarrollo Web, Kotlin, Lógica...
            </Text>
          </View>
          <FontAwesome name="chevron-right" size={16} color="#ccc" />
        </TouchableOpacity>

        {/* OPICIÓN 3: Diseño de Interiores (o Costura) */}
        <TouchableOpacity style={styles.tarjeta}>
          <View style={styles.iconoContainer}>
            <FontAwesome name="paint-brush" size={32} color="#1E90FF" />
          </View>
          <View style={styles.textosContainer}>
            <Text style={styles.textoTarjeta}>Diseño de Interiores</Text>
            <Text style={styles.subtextoTarjeta}>
              Remodelación, estilos, medidas...
            </Text>
          </View>
          <FontAwesome name="chevron-right" size={16} color="#ccc" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBF4FA",
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1E90FF",
    marginBottom: 30,
    textAlign: "center",
  },
  opcionesContainer: { gap: 15 }, // Espacio automático entre tarjetas
  tarjeta: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  iconoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#EBF4FA",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  textosContainer: { flex: 1 },
  textoTarjeta: { fontSize: 20, fontWeight: "bold", color: "#333" },
  subtextoTarjeta: { fontSize: 14, color: "#666", marginTop: 4 },
});
