import { ToWords } from "to-words";

export const convertAmountToWords = (amount: number): string => {
    const toWords = new ToWords();
    return toWords.convert(amount || 0, { currency: true });
  };