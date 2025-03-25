import React, { useState } from 'react';

// Daftar lengkap kode bank di Indonesia
const banks = [
  { id: 'bca', name: 'Bank Central Asia (BCA)', code: '014' },
  { id: 'bni', name: 'Bank Negara Indonesia (BNI)', code: '009' },
  { id: 'mandiri', name: 'Bank Mandiri', code: '008' },
  { id: 'bri', name: 'Bank Rakyat Indonesia (BRI)', code: '002' },
  { id: 'btn', name: 'Bank Tabungan Negara (BTN)', code: '200' },
  { id: 'permata', name: 'Bank Permata', code: '013' },
  { id: 'cimb', name: 'CIMB Niaga', code: '022' },
  { id: 'danamon', name: 'Bank Danamon', code: '011' },
  { id: 'mega', name: 'Bank Mega', code: '426' },
  { id: 'panin', name: 'Bank Panin', code: '019' },
  { id: 'bukopin', name: 'Bank Bukopin', code: '441' },
  { id: 'muamalat', name: 'Bank Muamalat', code: '147' },
  { id: 'bsi', name: 'Bank Syariah Indonesia (BSI)', code: '451' },
  { id: 'jateng', name: 'Bank Jateng', code: '113' },
  { id: 'jabar', name: 'Bank BJB (Jawa Barat dan Banten)', code: '110' },
  { id: 'jatim', name: 'Bank Jatim', code: '114' },
  { id: 'nobu', name: 'Bank Nationalnobu', code: '503' },
  { id: 'sinarmas', name: 'Bank Sinarmas', code: '153' },
];

// Informasi rekening tujuan
const accountDetails = {
  number: '0312762755',  // Nomor rekening utama
  name: 'Zakya Nurussofa',  // Nama penerima
};

function App() {
  const [selectedBank, setSelectedBank] = useState<string>('bca'); // Default BCA

  // Menggabungkan kode bank dengan nomor rekening tanpa separator
  const fullAccountNumber = `${banks.find(bank => bank.id === selectedBank)?.code || ''}${accountDetails.number}`;

  return (
    <div className="App">
      <h1>Transfer Bank</h1>

      {/* Dropdown Pilihan Bank */}
      <div>
        <label>Pilih Bank:</label>
        <select
          value={selectedBank}
          onChange={(e) => setSelectedBank(e.target.value)}
        >
          {banks.map((bank) => (
            <option key={bank.id} value={bank.id}>
              {`${bank.code} - ${bank.name}`}
            </option>
          ))}
        </select>
      </div>

      {/* Informasi Rekening */}
      <div>
        <p>
          Nomor Rekening Tujuan: <span className="font-medium"><strong>{fullAccountNumber}</strong></span>
        </p>
      </div>

      <p>Nama Penerima: <span className="font-medium">{accountDetails.name}</span></p>

      {/* Langkah Transfer */}
      <h2>Langkah-langkah Transfer:</h2>
      <ol>
        <li>Masuk ke aplikasi/ATM {banks.find(bank => bank.id === selectedBank)?.name} Anda.</li>
        <li>Pilih menu transfer antar bank.</li>
        <li>Masukkan nomor rekening berikut: <strong>{fullAccountNumber}</strong>.</li>
        <li>Masukkan nominal transfer sesuai tagihan.</li>
        <li>Periksa nama penerima: <strong>{accountDetails.name}</strong>.</li>
        <li>Konfirmasi dan selesaikan transfer.</li>
      </ol>

      {/* Peringatan dengan warna merah */}
      <p style={{ color: 'red', fontWeight: 'bold' }}>
        SALAH TRANSFER KE NOMOR REKENING LAIN BUKAN TANGGUNG JAWAB KAMI.
      </p>
    </div>
  );
}

export default App;
