
import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Appbar, Button, Chip, SegmentedButtons, Text } from 'react-native-paper';
import { listRequests, updateRequestStatus, RequestStatus } from '../api';

export default function DashboardScreen({ route, navigation }: any) {
  const [status, setStatus] = useState<RequestStatus>('OPEN');
  const [items, setItems] = useState<any[]>([]);
  const createdBy = route?.params?.createdBy || 'anon';

  async function reload() {
    const data = await listRequests({ status, createdBy });
    setItems(data);
  }

  useEffect(() => { reload(); }, [status]);

  async function advance(it: any) {
    const next: Record<RequestStatus, RequestStatus> = { OPEN: 'IN_PROGRESS', IN_PROGRESS: 'DONE', DONE: 'DONE' } as any;
    const updated = await updateRequestStatus(it.id, next[it.status]);
    setItems((old) => old.map((o) => o.id === it.id ? updated : o));
  }

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="Painel" />
      </Appbar.Header>

      <View style={{ padding: 16 }}>
        <SegmentedButtons
          value={status}
          onValueChange={(v) => setStatus(v as RequestStatus)}
          buttons={[
            { value: 'OPEN', label: 'Abertas' },
            { value: 'IN_PROGRESS', label: 'Em andamento' },
            { value: 'DONE', label: 'Concluídas' },
          ]}
        />
      </View>

      <ScrollView style={{ padding: 16 }}>
        {items.map((it) => (
          <Chip key={it.id} icon={it.status === 'DONE' ? 'check' : 'progress-clock'} style={{ marginBottom: 8 }} onPress={() => advance(it)}>
            {it.type} — {it.description}
          </Chip>
        ))}
        {items.length === 0 && <Text>Nenhuma solicitação em {status}.</Text>}
      </ScrollView>
    </View>
  );
}
