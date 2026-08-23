import { useState, useRef } from "react";

export default function PinInput({
  length = 6,
  value = [],
  onChange,
  onComplete,
  className = "",
}) {
  const [poppingIndex, setPoppingIndex] = useState(null);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const inputRefs = useRef([]);

  const handleInputChange = (e, index) => {
    const val = e.target.value;
    if (!/^\d*$/.test(val)) return;

    const newDigits = [...value];
    const digit = val.slice(-1);
    newDigits[index] = digit;

    if (onChange) onChange(newDigits);

    if (digit) {
      setPoppingIndex(index);
      setTimeout(() => setPoppingIndex(null), 300);

      if (index < length - 1) {
        inputRefs.current[index + 1]?.focus();
      }
    }

    if (newDigits.filter(Boolean).length === length && onComplete) {
      onComplete(newDigits.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").trim();
    if (!/^\d+$/.test(pastedData)) return;

    const digits = pastedData.slice(0, length).split("");
    const newDigits = Array.from({ length }, (_, i) => digits[i] || "");

    if (onChange) onChange(newDigits);

    const nextIndex = Math.min(digits.length, length - 1);
    inputRefs.current[nextIndex]?.focus();

    if (digits.length >= length && onComplete) {
      onComplete(newDigits.join(""));
    }
  };

  return (
    <div className={`flex items-center gap-2 sm:gap-3 justify-center ${className}`}>
      {Array.from({ length }).map((_, index) => {
        const digit = value[index] || "";
        const isFilled = Boolean(digit);
        const isFocused = focusedIndex === index;
        const isPopping = poppingIndex === index;

        return (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(null)}
            onChange={(e) => handleInputChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            className={`
              w-10 h-12 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-bold font-mono rounded-xl
              outline-none transition-all duration-300 transform cursor-pointer
              ${
                isFilled
                  ? "border-2 border-amber-400 text-amber-400 bg-amber-400/10 shadow-lg shadow-amber-400/20"
                  : "border border-white/20 text-white bg-white/5 hover:border-white/40"
              }
              ${
                isFocused
                  ? "ring-2 ring-amber-400 border-amber-400 shadow-md shadow-amber-400/30 scale-105"
                  : ""
              }
              ${isPopping ? "scale-[1.14]" : ""}
            `}
            style={{
              transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          />
        );
      })}
    </div>
  );
}
