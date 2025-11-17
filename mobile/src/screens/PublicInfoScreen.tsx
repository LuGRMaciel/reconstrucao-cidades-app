
import React, { useState } from 'react';
import { View } from 'react-native';
import { Appbar, Button, Text, TextInput } from 'react-native-paper';
import { getWeather } from '../api';

export default function PublicInfoScreen({ navigation }: any) {
  const [lat, setLat] = useState('-30.03');
  const [lon, setLon] = useState('-51.23');
  const [result, setResult] = useState<any>(null);

  async function load() {
    const data = await getWeather(Number(lat), Number(lon));
    setResult(data);
  }

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Informações públicas" />
      </Appbar.Header>
      <View style={{ padding: 16 }}>
        <TextInput label="Latitude" value={lat} onChangeText={setLat} keyboardType="numeric" style={{ marginBottom: 8 }} />
        <TextInput label="Longitude" value={lon} onChangeText={setLon} keyboardType="numeric" style={{ marginBottom: 8 }} />
        <Button mode="contained" onPress={load}>Ver previsão (24h)</Button>

        {result && (
          <View style={{ marginTop: 16 }}>
            <Text>Timezone: {result.timezone}</Text>
            {result.hourly?.map((p: any) => (
              <Text key={p.time}>{new Date(p.time).toLocaleString()} — {p.temperature_2m}°C — {p.precipitation_probability}% chuva</Text>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
