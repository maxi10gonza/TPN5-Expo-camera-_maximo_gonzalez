import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Inicio de Sesión' }} />
      <Stack.Screen name="facial-recognition" options={{ title: 'Reconocimiento Facial' }} />
      <Stack.Screen name="welcome" options={{ title: 'Bienvenido' }} />
    </Stack>
  );
}