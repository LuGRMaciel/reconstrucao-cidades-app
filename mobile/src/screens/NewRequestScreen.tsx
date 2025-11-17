
import React, { useState } from 'react';
import { View } from 'react-native';
import { Appbar, Button, RadioButton, Text, TextInput } from 'react-native-paper';
import { createRequest } from '../api';

export default function NewRequestScreen({ route, navigation }: any) {
  const locationId = route?.params?.locationId;
  const [type, setType] = useState<'MATERIAL'|'VOLUNTEER'>('MATERIAL');
  const [description, setDescription] = useState('');
  const [createdBy, setCreatedBy] = useState('anon');

  async function onSubmit() {
    await createRequest({ type, description, createdBy, locationId });
    navigation.navigate('Painel', { createdBy });
  }

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Nova Solicitação" />
      </Appbar.Header>

      <View style={{ padding: 16 }}>
        <Text variant="titleMedium">Tipo de ajuda</Text>
        <RadioButton.Group onValueChange={(v) => setType(v as any)} value={type}>
          <RadioButton.Item label="Materiais" value="MATERIAL" />
          <RadioButton.Item label="Voluntários" value="VOLUNTEER" />
        </RadioButton.Group>

        <TextInput label="Descrição" value={description} onChangeText={setDescription} multiline style={{ marginBottom: 8 }} />
        <TextInput label="Seu identificador" value={createdBy} onChangeText={setCreatedBy} style={{ marginBottom: 8 }} />
        <Button mode="contained" onPress={onSubmit}>Enviar</Button>
      </View>
    </View>
  );
}
