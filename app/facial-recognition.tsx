import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
// CAMBIO 1: Importamos CameraView y el hook useCameraPermissions
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';

export default function FacialRecognitionScreen() {
  // CAMBIO 2: Usamos el hook para manejar los permisos
  const [permission, requestPermission] = useCameraPermissions();
  const [isScanning, setIsScanning] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Si los permisos aún no se han determinado, los solicitamos
    if (!permission) {
      requestPermission();
    }

    // Si los permisos fueron denegados, mostramos una alerta y volvemos
    if (permission?.granted === false) {
      Alert.alert(
        'Permiso denegado',
        'La aplicación necesita acceso a la cámara para el reconocimiento facial.',
        [{ text: 'OK', onPress: () => router.back() }]
      );
    }
    
    // Si los permisos fueron concedidos, iniciamos la simulación
    if (permission?.granted === true) {
      const timer = setTimeout(() => {
        setIsScanning(false);
        Alert.alert('Login Exitoso', 'Reconocimiento facial completado.');
        router.replace('/welcome');
      }, 3000); // Simula 3 segundos de reconocimiento

      return () => clearTimeout(timer); // Limpia el temporizador si el componente se desmonta
    }
  }, [permission]); // El efecto se ejecuta cuando el estado del permiso cambia

  // Mientras se cargan los permisos, mostramos un indicador de carga
  if (!permission) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Solicitando permiso de cámara...</Text>
      </View>
    );
  }

  // Si el permiso fue denegado explícitamente, mostramos un mensaje
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', padding: 10 }}>
          El permiso para usar la cámara fue denegado. Por favor, habilítalo en la configuración de tu dispositivo.
        </Text>
      </View>
    );
  }
  
  // Si tenemos permiso, mostramos la cámara
  return (
    <View style={styles.container}>
      {/* CAMBIO 3: Usamos el componente CameraView y la prop 'facing' */}
      <CameraView style={styles.camera} facing="front">
        <View style={styles.overlay}>
          <Text style={styles.text}>{isScanning ? 'Escaneando...' : 'Verificación Completa'}</Text>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
});