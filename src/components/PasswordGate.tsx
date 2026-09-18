import React, { useState, useEffect } from 'react';
import { Lock, KeyRound, ShieldCheck, Stethoscope, AlertCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PasswordGateProps {
  isUnlocked: boolean;
  onUnlock: () => void;
}

export const PasswordGate: React.FC<PasswordGateProps> = ({ isUnlocked, onUnlock }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  const CORRECT_PIN = '9669';

  const handleKeyPress = (num: string) => {
    if (pin.length < 4) {
      const nextPin = pin + num;
      setPin(nextPin);
      setError(false);
      if (nextPin.length === 4) {
        verifyPin(nextPin);
      }
    }
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
    setError(false);
  };

  const verifyPin = (codeToVerify: string) => {
    if (codeToVerify === CORRECT_PIN) {
      onUnlock();
    } else {
      setError(true);
      setShakeKey(prev => prev + 1);
      setTimeout(() => {
        setPin('');
      }, 500);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key >= '0' && e.key <= '9') {
      handleKeyPress(e.key);
    } else if (e.key === 'Backspace') {
      handleDelete();
    } else if (e.key === 'Enter' && pin.length === 4) {
      verifyPin(pin);
    }
  };

  useEffect(() => {
    if (!isUnlocked) {
      const handleGlobalKeyDown = (e: KeyboardEvent) => {
        if (e.key >= '0' && e.key <= '9') {
          handleKeyPress(e.key);
        } else if (e.key === 'Backspace') {
          handleDelete();
        }
      };
      window.addEventListener('keydown', handleGlobalKeyDown);
      return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }
  }, [pin, isUnlocked]);

  if (isUnlocked) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4 print:hidden"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <motion.div
        key={shakeKey}
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={error ? { x: [-10, 10, -8, 8, -4, 4, 0], opacity: 1, scale: 1, y: 0 } : { opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl shadow-teal-950/40 text-center"
      >
        <div className="mx-auto w-16 h-16 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center mb-6 text-teal-400">
          <Stethoscope className="w-8 h-8" />
        </div>

        <h1 className="text-2xl font-bold text-slate-100 tracking-tight mb-1">
          Acesso Restrito
        </h1>
        <p className="text-sm text-slate-400 mb-6">
          Sua sessão de emissão de documentos médicos exige autenticação com a senha de segurança.
        </p>

        {/* PIN Dots Indicator */}
        <div className="flex justify-center items-center gap-3 mb-6">
          {[0, 1, 2, 3].map((index) => {
            const isFilled = pin.length > index;
            return (
              <motion.div
                key={index}
                animate={{
                  scale: isFilled ? [1, 1.25, 1] : 1,
                  backgroundColor: isFilled 
                    ? error ? '#ef4444' : '#14b8a6' 
                    : '#1e293b'
                }}
                className={`w-4 h-4 rounded-full border transition-colors ${
                  isFilled 
                    ? error ? 'border-red-500 bg-red-500 shadow-md shadow-red-500/50' : 'border-teal-400 bg-teal-500 shadow-md shadow-teal-500/50' 
                    : 'border-slate-700 bg-slate-800'
                }`}
              />
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {error ? (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2 text-xs font-medium text-red-400 mb-6 bg-red-950/40 py-2 px-3 rounded-lg border border-red-900/50"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Senha incorreta. Tente novamente.</span>
            </motion.div>
          ) : (
            <div className="h-9 mb-6 flex items-center justify-center text-xs text-slate-500">
              <span>Digite os 4 dígitos ou use o teclado numérico</span>
            </div>
          )}
        </AnimatePresence>

        {/* On-screen Keypad */}
        <div className="grid grid-cols-3 gap-3 mb-6 max-w-xs mx-auto">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleKeyPress(num)}
              className="h-12 text-lg font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 rounded-xl active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-sm"
            >
              {num}
            </button>
          ))}
          <div className="h-12 flex items-center justify-center text-slate-600 text-xs font-mono">
            SEC
          </div>
          <button
            type="button"
            onClick={() => handleKeyPress('0')}
            className="h-12 text-lg font-semibold text-slate-200 bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 rounded-xl active:scale-95 transition-all flex items-center justify-center cursor-pointer shadow-sm"
          >
            0
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="h-12 text-xs font-medium text-slate-400 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/40 rounded-xl active:scale-95 transition-all flex items-center justify-center cursor-pointer"
          >
            Apagar
          </button>
        </div>

        <div className="text-xs text-slate-500 border-t border-slate-800/80 pt-4 flex items-center justify-between">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-teal-500" />
            DocMédico Studio v2.5
          </span>
          <span className="text-slate-600 font-mono">PIN: 9669</span>
        </div>
      </motion.div>
    </div>
  );
};
