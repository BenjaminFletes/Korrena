import { FontAwesome } from "@expo/vector-icons";
import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

// --- CONEXIÓN AL CEREBRO DE GOOGLE ---
const API_KEY = "AIzaSyBdca6KDKtSNux4ieeBbdAYSb6NZHvzFLs"; // Pega tu clave real aquí
const genAI = new GoogleGenerativeAI(API_KEY);

interface Mensaje {
  id: string;
  texto: string;
  esUsuario: boolean;
}

export default function TerapiaScreen() {
  const [mensajes, setMensajes] = useState<Mensaje[]>([
    {
      id: "1",
      texto:
        "Hola Benjamín, soy el compañero IA de Korrena. ¿Cómo te sientes el día de hoy?",
      esUsuario: false,
    },
  ]);
  const [inputTexto, setInputTexto] = useState("");
  const [escribiendo, setEscribiendo] = useState(false); // Para mostrar que la IA está pensando

  const enviarMensaje = async () => {
    if (inputTexto.trim() === "") return;

    // 1. Mostrar tu mensaje en la pantalla
    const textoUsuario = inputTexto;
    const nuevoMensajeUsuario: Mensaje = {
      id: Date.now().toString(),
      texto: textoUsuario,
      esUsuario: true,
    };

    setMensajes((prev) => [...prev, nuevoMensajeUsuario]);
    setInputTexto("");
    setEscribiendo(true);

    // 2. Hablar con la IA real
    try {
      // Regresamos al modelo gratuito y ultrarrápido
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

      // ¡EL SECRETO ESTÁ EN EL PROMPT! Le damos un rol complejo y profundo.
      const prompt = `Actúa como un psicólogo cognitivo-conductual altamente capacitado. Estás hablando con Benjamín, un estudiante de Ingeniería en Computación que está desarrollando esta app. 
      Tu objetivo no es solo dar ánimos vacíos, sino ayudarlo a reflexionar. Hazle una pregunta profunda que lo invite a analizar la raíz de sus sentimientos. Usa un tono empático, cálido, conversacional y muy inteligente.
      El usuario te acaba de decir esto: "${textoUsuario}"`;

      const result = await model.generateContent(prompt);
      const respuestaTexto = result.response.text();

      const respuestaIA: Mensaje = {
        id: (Date.now() + 1).toString(),
        texto: respuestaTexto,
        esUsuario: false,
      };
      setMensajes((prev) => [...prev, respuestaIA]);
    } catch (error) {
      console.error("Error con la IA:", error);
      const mensajeError: Mensaje = {
        id: (Date.now() + 1).toString(),
        texto:
          "Uy, mi cerebro está un poco desconectado ahora mismo. Revisa tu conexión a internet o tu API Key.",
        esUsuario: false,
      };
      setMensajes((prev) => [...prev, mensajeError]);
    } finally {
      setEscribiendo(false);
    }
  };

  const renderizarMensaje = ({ item }: { item: Mensaje }) => (
    <View
      style={[
        styles.burbuja,
        item.esUsuario ? styles.burbujaUsuario : styles.burbujaIA,
      ]}
    >
      <Text
        style={[
          styles.textoMensaje,
          item.esUsuario ? styles.textoUsuario : styles.textoIA,
        ]}
      >
        {item.texto}
      </Text>
    </View>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Compañero IA</Text>
        <Text style={styles.headerSubtitle}>Espacio seguro y privado</Text>
      </View>

      <FlatList
        data={mensajes}
        keyExtractor={(item) => item.id}
        renderItem={renderizarMensaje}
        contentContainerStyle={styles.listaMensajes}
      />

      {escribiendo && (
        <View style={styles.cargandoContainer}>
          <ActivityIndicator size="small" color="#1E90FF" />
          <Text style={styles.textoCargando}>Korrena está escribiendo...</Text>
        </View>
      )}

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Escribe cómo te sientes..."
          value={inputTexto}
          onChangeText={setInputTexto}
          multiline
        />
        <TouchableOpacity
          style={styles.botonEnviar}
          onPress={enviarMensaje}
          disabled={escribiendo}
        >
          <FontAwesome
            name="send"
            size={20}
            color={escribiendo ? "#ccc" : "white"}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F7FA" },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: "white",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#1E90FF" },
  headerSubtitle: { fontSize: 14, color: "#666", marginTop: 5 },
  listaMensajes: { padding: 20, paddingBottom: 10 },
  burbuja: { maxWidth: "80%", padding: 15, borderRadius: 20, marginBottom: 15 },
  burbujaUsuario: {
    backgroundColor: "#1E90FF",
    alignSelf: "flex-end",
    borderBottomRightRadius: 5,
  },
  burbujaIA: {
    backgroundColor: "white",
    alignSelf: "flex-start",
    borderBottomLeftRadius: 5,
    elevation: 1,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
  },
  textoMensaje: { fontSize: 16, lineHeight: 22 },
  textoUsuario: { color: "white" },
  textoIA: { color: "#333" },
  cargandoContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  textoCargando: { marginLeft: 10, color: "#666", fontStyle: "italic" },
  inputContainer: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "white",
    alignItems: "flex-end",
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  input: {
    flex: 1,
    backgroundColor: "#F0F2F5",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    maxHeight: 100,
    fontSize: 16,
  },
  botonEnviar: {
    backgroundColor: "#1E90FF",
    width: 45,
    height: 45,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginBottom: 2,
  },
});
