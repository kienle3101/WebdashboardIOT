import DeviceControlPanel from '../../components/DeviceControlPanel';
import { useDevices } from '../../hooks/useDevices';

export default function MyDevicesPage() {
  const { devices, toggleDevice, isLoading } = useDevices();

  return (
    <DeviceControlPanel devices={devices} onToggle={toggleDevice} loading={isLoading} />
  );
}
