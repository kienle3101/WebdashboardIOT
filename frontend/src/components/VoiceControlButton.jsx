import { useEffect, useRef, useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { parseVoiceCommand, controlDeviceByVoice } from '../api/voiceApi';

export default function VoiceControlButton({ onSuccess }) {
  const [listening, setListening] = useState(false);
  const [message, setMessage] = useState('');
  const recognitionRef = useRef(null);

  const getRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setMessage('Trình duyệt không hỗ trợ nhận diện giọng nói. Hãy dùng Chrome.');
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'vi-VN';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    return recognition;
  };

  const handleClick = () => {
    if (listening) {
      recognitionRef.current?.stop();
      return;
    }

    const recognition = getRecognition();
    if (!recognition) return;

    recognitionRef.current = recognition;
    setListening(true);
    setMessage('Đang nghe...');

    recognition.onresult = async (event) => {
      const text = event.results[0][0].transcript;
      setMessage(`Bạn nói: "${text}"`);

      const command = parseVoiceCommand(text);
      if (!command) {
        setMessage((prev) => prev + ' — Không nhận diện được lệnh (nói ví dụ: "bật đèn", "tắt quạt", "mở cửa").');
        return;
      }

      try {
        const result = await controlDeviceByVoice(command);
        setMessage(`✅ ${result?.message || 'Điều khiển thành công'}`);
        onSuccess?.();
      } catch (err) {
        const errMsg = err?.response?.data?.message || 'Bạn không có quyền điều khiển thiết bị này';
        setMessage(`❌ ${errMsg}`);
      }
    };

    recognition.onerror = (event) => {
      setMessage(`Lỗi nhận diện: ${event.error}`);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.start();
  };

  useEffect(() => {
    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  return (
    <div style={{ display: 'grid', gap: 10 }}>
      <button
        type="button"
        onClick={handleClick}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '12px 18px',
          borderRadius: 14,
          border: 'none',
          background: listening ? '#dc2626' : '#2563eb',
          color: '#fff',
          fontWeight: 700,
          cursor: 'pointer',
          width: 'fit-content',
        }}
      >
        {listening ? <MicOff size={18} /> : <Mic size={18} />}
        {listening ? 'Đang nghe... (bấm để dừng)' : 'Điều khiển bằng giọng nói'}
      </button>

      {message && (
        <div style={{ fontSize: 13, color: '#334155', background: '#f8fafc', padding: '8px 12px', borderRadius: 10 }}>
          {message}
        </div>
      )}
    </div>
  );
}