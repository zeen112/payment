import React, { useState } from 'react';
import { Search, Copy, ChevronDown, Wallet, Building2, QrCode } from 'lucide-react';

// Bank list data with bank codes for transfer to BCA
const banks = [
  { id: "bca", name: "Bank Central Asia (BCA)", code: "014" },
  { id: "bni", name: "Bank Negara Indonesia (BNI)", code: "009" },
  { id: "mandiri", name: "Bank Mandiri", code: "008" },
  { id: "bri", name: "Bank Rakyat Indonesia (BRI)", code: "002" },
  { id: "cimb", name: "CIMB Niaga", code: "022" },
  { id: "permata", name: "Bank Permata", code: "013" },
  { id: "danamon", name: "Bank Danamon", code: "011" },
  { id: "btn", name: "Bank BTN", code: "200" },
  { id: "bsi", name: "Bank Syariah Indonesia", code: "451" },
  { id: "mega", name: "Bank Mega", code: "426" },
  { id: "jatim", name: "Bank Jatim", code: "114" },
];

// E-Wallet data
const ewallets = [
  { id: 'dana', name: 'DANA', number: '085176827402' },
  { id: 'gopay', name: 'GoPay', number: '085176827402' },
  { id: 'ovo', name: 'OVO', number: '085176827402' },
];

// BCA Account details
const bcaAccount = {
  number: '0312762755', // Nomor rekening tetap
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
          <button onClick={() => setSelectedMethod('bank')} className={`flex items-center justify-center gap-2 p-4 rounded-xl transition-all ${selectedMethod === 'bank' ? 'bg-blue-100 text-blue-700' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}>
            <Building2 className="w-5 h-5" />
            <span>Bank Transfer</span>
          </button>

          <button onClick={() => setSelectedMethod('ewallet')} className={`flex items-center justify-center gap-2 p-4 rounded-xl ${selectedMethod === 'ewallet' ? 'bg-blue-100 text-blue-700' : 'bg-gray-50 text-gray-600'}`}>
            <Wallet className="w-5 h-5" />
            <span>E-Wallet</span>
          </button>
        </div>

        {/* Bank Transfer Section */}
        {selectedMethod === 'bank' && (
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-xl">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Transfer ke Rekening BCA</h2>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nomor Rekening:</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold">{bcaAccount.number}</span>
                    <button onClick={() => handleCopy(bcaAccount.number, 'bca')} className="text-blue-600 hover:text-blue-700">
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Nama Rekening:</span>
                  <span className="font-medium">{bcaAccount.name}</span>
                </div>
              </div>
            </div>

            {/* Dropdown untuk Pilih Bank */}
            <div>
              <button onClick={() => setIsBankDropdownOpen(!isBankDropdownOpen)} className="w-full p-4 text-left">
                <span>{selectedBank || 'Pilih Bank Anda'}</span>
                <ChevronDown className={`w-5 h-5 ${isBankDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isBankDropdownOpen && (
                <div className="absolute mt-2 bg-white p-4 rounded-xl shadow-lg">
                  <input
                    type="text"
                    placeholder="Cari bank..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="p-2 rounded-lg"
                  />
                  {filteredBanks.map((bank) => (
                    <div key={bank.id} onClick={() => setSelectedBank(bank.name)}>
                      <div className="font-medium">{bank.name}</div>
                      <span className="text-sm">Kode Bank: {bank.code}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <p className="text-red-600 font-bold">SALAH TRANSFER KE NOMOR REKENING LAIN BUKAN TANGGUNG JAWAB KAMI.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
