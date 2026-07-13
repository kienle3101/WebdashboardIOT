import DeviceControlPanel from '../../components/DeviceControlPanel';
import VoiceControlButton from '../../components/VoiceControlButton';
import { useDevices } from '../../hooks/useDevices';

export default function MyDevicesPage() {
  const { devices, toggleDevice, isLoading, refetch } = useDevices();

  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <VoiceControlButton onSuccess={refetch} />
      <DeviceControlPanel devices={devices} onToggle={toggleDevice} loading={isLoading} />
    </div>
  );
}