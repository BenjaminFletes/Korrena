import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";

// --- 1. CONFIGURACIÓN DEL IDIOMA (Aquí está LocaleConfig) ---
LocaleConfig.locales["es"] = {
  monthNames: [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ],
  monthNamesShort: [
    "Ene",
    "Feb",
    "Mar",
    "Abr",
    "May",
    "Jun",
    "Jul",
    "Ago",
    "Sep",
    "Oct",
    "Nov",
    "Dic",
  ],
  dayNames: [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ],
  dayNamesShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"],
  today: "Hoy",
};
LocaleConfig.defaultLocale = "es";

// --- 2. DEFINICIÓN DE TIPOS (Para que TypeScript no se queje) ---
interface RegistroDiario {
  emocion: string;
  nota: string;
}

interface MapaRegistros {
  [fecha: string]: RegistroDiario;
}

// --- 3. COMPONENTE PRINCIPAL ---
export default function CalendarioKorrena() {
  // Lógica de Estado
  const [registros, setRegistros] = useState<MapaRegistros>({});
  const [diaSeleccionado, setDiaSeleccionado] = useState<string>("");

  // Lógica del Modal (Ventana emergente)
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [emocionTemp, setEmocionTemp] = useState<string>("");
  const [notaTemp, setNotaTemp] = useState<string>("");

  // Función al tocar un día
  const alPresionarDia = (dia: { dateString: string }) => {
    setDiaSeleccionado(dia.dateString);

    // Si ya hay algo guardado, lo mostramos. Si no, limpiamos.
    if (registros[dia.dateString]) {
      setEmocionTemp(registros[dia.dateString].emocion);
      setNotaTemp(registros[dia.dateString].nota);
    } else {
      setEmocionTemp("");
      setNotaTemp("");
    }
    setModalVisible(true);
  };

  // Función al guardar la nota
  const guardarRegistro = () => {
    if (!emocionTemp) {
      alert("¡Selecciona cómo te sientes primero!");
      return;
    }

    setRegistros({
      ...registros,
      [diaSeleccionado]: { emocion: emocionTemp, nota: notaTemp },
    });

    setModalVisible(false);
  };

  // Preparar los puntitos azules en el calendario
  const markedDates: { [key: string]: any } = {};
  Object.keys(registros).forEach((fecha) => {
    markedDates[fecha] = { marked: true, dotColor: "#1E90FF" };
  });

  const emociones = ["😁", "😌", "😐", "😔", "😡"];

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Mi Registro Korrena</Text>

      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={alPresionarDia}
          markedDates={{
            ...markedDates,
            [diaSeleccionado]: { selected: true, selectedColor: "#1E90FF" },
          }}
          theme={{
            backgroundColor: "#ffffff",
            calendarBackground: "#ffffff",
            textSectionTitleColor: "#1E90FF",
            selectedDayBackgroundColor: "#1E90FF",
            selectedDayTextColor: "#ffffff",
            todayTextColor: "#1E90FF",
            dayTextColor: "#2d4150",
            arrowColor: "#1E90FF",
            monthTextColor: "#1E90FF",
            textMonthFontWeight: "bold",
          }}
        />
      </View>

      {/* VENTANA EMERGENTE (MODAL) */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Día: {diaSeleccionado}</Text>

            <Text style={styles.label}>¿Cómo te sientes hoy?</Text>
            <View style={styles.emojisContainer}>
              {emociones.map((emoji) => (
                <TouchableOpacity
                  key={emoji}
                  style={[
                    styles.emojiBoton,
                    emocionTemp === emoji && styles.emojiSeleccionado,
                  ]}
                  onPress={() => setEmocionTemp(emoji)}
                >
                  <Text style={styles.emojiTexto}>{emoji}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.label}>¿Por qué?</Text>
            <TextInput
              style={styles.input}
              placeholder="Escribe una pequeña nota..."
              value={notaTemp}
              onChangeText={setNotaTemp}
              multiline
            />

            <View style={styles.botonesContainer}>
              <TouchableOpacity
                style={styles.botonCancelar}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.textoBotonSecundario}>Cerrar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.botonGuardar}
                onPress={guardarRegistro}
              >
                <Text style={styles.textoBoton}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// --- 4. ESTILOS VISUALES ---
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
    marginBottom: 20,
    textAlign: "center",
  },
  calendarContainer: {
    borderRadius: 15,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    margin: 20,
    padding: 25,
    borderRadius: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1E90FF",
    marginBottom: 15,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 10,
    color: "#333",
  },
  emojisContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  emojiBoton: { padding: 10, borderRadius: 30, backgroundColor: "#f0f0f0" },
  emojiSeleccionado: {
    backgroundColor: "#1E90FF",
    borderWidth: 2,
    borderColor: "#005cbf",
  },
  emojiTexto: { fontSize: 30 },
  input: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    height: 100,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 20,
  },
  botonesContainer: { flexDirection: "row", justifyContent: "space-between" },
  botonCancelar: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#eee",
    marginRight: 10,
    alignItems: "center",
  },
  botonGuardar: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    backgroundColor: "#1E90FF",
    marginLeft: 10,
    alignItems: "center",
  },
  textoBoton: { color: "white", fontWeight: "bold", fontSize: 16 },
  textoBotonSecundario: { color: "#333", fontWeight: "bold", fontSize: 16 },
});
