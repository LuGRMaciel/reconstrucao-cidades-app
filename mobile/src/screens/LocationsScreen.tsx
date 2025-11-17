
import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Appbar, Button, Card, Text, TextInput } from 'react-native-paper';
import { createLocation, listLocations } from '../api';

export default function LocationsScreen({ navigation }: any) {
  const [items, setItems] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  async function reload() {
    const data = await listLocations();
    setItems(data);
  }

  useEffect(() => { reload(); }, []);

  async function onAdd() {
    if (!name.trim()) return;
    await createLocation({ name, description });
    setName(''); setDescription('');
    reload();
  }

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.Content title="Locais afetados" />
        <Appbar.Action icon="view-dashboard" onPress={() => navigation.navigate('Painel')} />
        <Appbar.Action icon="information" onPress={() => navigation.navigate('Informações Públicas')} />
      </Appbar.Header>
      <ScrollView style={{ padding: 16 }}>
        <Card style={{ marginBottom: 12 }}>
          <Card.Title title="Cadastrar novo local" />
          <Card.Content>
            <TextInput label="Nome" value={name} onChangeText={setName} style={{ marginBottom: 8 }} />
            <TextInput label="Descrição" value={description} onChangeText={setDescription} multiline />
            <Button mode="contained" style={{ marginTop: 8 }} onPress={onAdd}>Salvar</Button>
          </Card.Content>
        </Card>

        {items.map((it) => (
          <Card key={it.id} style={{ marginBottom: 12 }}>
            <Card.Title title={it.name} subtitle={new Date(it.createdAt).toLocaleString()} />
            {it.description ? <Card.Content><Text>{it.description}</Text></Card.Content> : null}
            <Card.Actions>
              <Button onPress={() => navigation.navigate('Nova Solicitação', { locationId: it.id })}>Solicitar ajuda</Button>
            </Card.Actions>
          </Card>
        ))}
      </ScrollView>
    </View>
  );
}
