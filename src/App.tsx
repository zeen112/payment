import React, { useState } from 'react';
import { Search, Copy, ChevronDown, Wallet, Building2, QrCode } from 'lucide-react';

// Bank list data with bank codes for transfer to BCA
const banks = [
  { id: 'bca', name: 'Bank Central Asia (BCA)', code: '014', info: 'Transfer langsung' },
  { id: 'bni', name: 'Bank Negara Indonesia (BNI)', code: '009', info: 'Kode Bank: 014' },
  { id: 'mandiri', name: 'Bank Mandiri', code: '008', info: 'Kode Bank: 014' },
  { id: 'bri', name: 'Bank Rakyat Indonesia (BRI)', code: '002', info: 'Kode Bank: 014' },
  { id: 'cimb', name: 'CIMB Niaga', code: '022', info: 'Kode Bank: 014' },
  { id: 'permata', name: 'Bank Permata', code: '013', info: 'Kode Bank: 014' },
  { id: 'danamon', name: 'Bank Danamon', code: '011', info: 'Kode Bank: 014' },
  { id: 'btn', name: 'Bank BTN', code: '200', info: 'Kode Bank: 014' },
  { id: 'bsi', name: 'Bank Syariah Indonesia', code: '451', info: 'Kode Bank: 014' },
];

// E-Wallet data
const ewallets = [
  { id: 'dana', name: 'DANA', number: '085176827402' },
  { id: 'gopay', name: 'GoPay', number: '085176827402' },
  { id: 'ovo', name: 'OVO', number: '085176827402' },
];

// BCA Account details
const bcaAccount = {
  number: '0312762755',
  name: 'Zakya Nurussofa',
};

function App() {
  const [selectedMethod, setSelectedMethod] = useState<string>('bank');
  const [isBankDropdownOpen, setIsBankDropdownOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedText, setCopiedText] = useState('');

  const filteredBanks = banks.filter(bank =>
    bank.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(type);
    setTimeout(() => setCopiedText(''), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Pembayaran</h1>
        
        {/* Payment Method Selection */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => setSelectedMethod('bank')}
            className={`flex items-center justify-center gap-2 p-4 rounded-xl transition-all ${
              selectedMethod === 'bank'
                ? 'bg-blue-100 text-blue-700 shadow-sm'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Building2 className="w-5 h-5" />
            <span>Bank Transfer</span>
          </button>
          <button
            onClick={() => setSelectedMethod('ewallet')}
            className={`flex items-center justify-center gap-2 p-4 rounded-xl transition-all ${
              selectedMethod === 'ewallet'
                ? 'bg-blue-100 text-blue-700 shadow-sm'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Wallet className="w-5 h-5" />
            <span>E-Wallet</span>
          </button>
          <button
            onClick={() => setSelectedMethod('qris')}
            className={`flex items-center justify-center gap-2 p-4 rounded-xl transition-all ${
              selectedMethod === 'qris'
                ? 'bg-blue-100 text-blue-700 shadow-sm'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <QrCode className="w-5 h-5" />
            <span>QRIS</span>
          </button>
        </div>

        {/* Bank Transfer Section */}
        {selectedMethod === 'bank' && (
          <div className="space-y-6">
            {/* BCA Account Info */}
            <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Transfer ke Rekening BCA</h2>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Nomor Rekening:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-medium">{bcaAccount.number}</span>
                    <button
                      onClick={() => handleCopy(bcaAccount.number, 'bca')}
                      className="text-blue-600 hover:text-blue-700 p-1"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Nama Rekening:</span>
                  <span className="font-medium">{bcaAccount.name}</span>
                </div>
              </div>
            </div>

            {/* Bank Selection */}
            <div className="relative">
              <button
                onClick={() => setIsBankDropdownOpen(!isBankDropdownOpen)}
                className="w-full p-4 text-left bg-gray-50 rounded-xl flex items-center justify-between hover:bg-gray-100 transition-colors"
              >
                <span>{selectedBank || 'Pilih Bank Anda'}</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${isBankDropdownOpen ? 'transform rotate-180' : ''}`} />
              </button>
              
              {isBankDropdownOpen && (
                <div className="absolute w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-100 z-10 overflow-hidden">
                  <div className="p-3 border-b">
                    <div className="relative">
                      <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Cari bank..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {filteredBanks.map((bank) => (
                      <div
                        key={bank.id}
                        className="p-3 hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => {
                          setSelectedBank(bank.name);
                          setIsBankDropdownOpen(false);
                        }}
                      >
                        <div className="font-medium">{bank.name}</div>
                        <div className="text-sm text-gray-500">
                          {bank.id === 'bca' ? (
                            'Transfer langsung ke rekening BCA'
                          ) : (
                            <>
                              Kode Bank Tujuan: <span className="font-medium">014</span> (BCA)
                              <br />
                              Kode Bank Asal: <span className="font-medium">{bank.code}</span>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Transfer Instructions */}
            {selectedBank && (
              <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                <h3 className="font-semibold text-gray-800">Petunjuk Transfer</h3>
                <ol className="list-decimal list-inside space-y-2 text-gray-600">
                  <li>Masuk ke aplikasi/ATM bank Anda</li>
                  <li>Pilih menu transfer {selectedBank.includes('BCA') ? 'sesama BCA' : 'antar bank'}</li>
                  {!selectedBank.includes('BCA') && (
                    <li>Masukkan kode bank BCA: <span className="font-medium">014</span></li>
                  )}
                  <li>Masukkan nomor rekening: <span className="font-medium">{bcaAccount.number}</span></li>
                  <li>Masukkan nominal transfer sesuai tagihan</li>
                  <li>Periksa nama penerima: <span className="font-medium">{bcaAccount.name}</span></li>
                  <li>Konfirmasi dan selesaikan transfer</li>
                </ol>
              </div>
            )}
          </div>
        )}

        {/* E-Wallet Section */}
        {selectedMethod === 'ewallet' && (
          <div className="space-y-4">
            {ewallets.map((wallet) => (
              <div key={wallet.id} className="p-4 bg-gray-50 rounded-xl">
                <div className="font-medium mb-2">{wallet.name}</div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">{wallet.number}</span>
                  <button
                    onClick={() => handleCopy(wallet.number, wallet.id)}
                    className="text-blue-600 hover:text-blue-700 p-2"
                  >
                    <Copy className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* QRIS Section */}
        {selectedMethod === 'qris' && (
          <div className="text-center">
            <img
              src="https://images.unsplash.com/photo-1672500窶�" // Placeholder QR code image
              alt="QRIS Payment Code"
              className="mx-auto w-64 h-64 object-cover rounded-xl shadow-md"
            />
            <p className="mt-4 text-gray-600">Scan QR code untuk melakukan pembayaran</p>
          </div>
        )}

        {/* Copied Notification */}
        {copiedText && (
          <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-up">
            Nomor berhasil disalin!
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
