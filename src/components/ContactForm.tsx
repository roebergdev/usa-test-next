'use client';

import { Star, Phone, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ContactFormProps {
  contactName: string;
  setContactName: (name: string) => void;
  contactValue: string;
  setContactValue: (value: string) => void;
  isSubmittingContact: boolean;
  onSubmit: (e: React.FormEvent) => void;
}

export function ContactForm({
  contactName,
  setContactName,
  contactValue,
  setContactValue,
  isSubmittingContact,
  onSubmit,
}: ContactFormProps) {
  return (
    <motion.div
      key="contactForm"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md mx-auto bg-white border border-amac-blue/5 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-amac-blue/10 space-y-8"
    >
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-amac-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Star className="w-8 h-8 text-amac-blue" />
        </div>
        <h2 className="text-3xl font-black tracking-tighter uppercase text-amac-dark">
          Great Progress!
        </h2>
        <p className="text-neutral-500 font-medium">
          You&apos;ve answered 5 questions. To continue your patriotic journey, tell us who you are!
        </p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-[10px] font-black text-amac-blue uppercase tracking-widest px-1">
            Your Name
          </label>
          <input
            required
            type="text"
            placeholder="First & Last Name"
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
            className="w-full px-4 py-3 bg-amac-gray border border-transparent focus:border-amac-blue/20 focus:bg-white rounded-xl outline-none transition-all font-bold text-amac-dark"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[10px] font-black text-amac-blue uppercase tracking-widest px-1 flex items-center gap-1">
            <Phone className="w-3 h-3" />
            Phone Number
          </label>
          <input
            required
            type="tel"
            placeholder="(555) 000-0000"
            value={contactValue}
            onChange={(e) => setContactValue(e.target.value)}
            className="w-full px-4 py-3 bg-amac-gray border border-transparent focus:border-amac-blue/20 focus:bg-white rounded-xl outline-none transition-all font-bold text-amac-dark"
          />
        </div>

        <button
          disabled={isSubmittingContact || !contactValue || !contactName}
          type="submit"
          className="w-full py-4 bg-amac-blue text-white rounded-xl font-black text-sm uppercase tracking-widest hover:bg-amac-blue/90 transition-all shadow-lg shadow-amac-blue/20 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isSubmittingContact ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <>
              Continue Journey
              <ChevronRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </motion.div>
  );
}
