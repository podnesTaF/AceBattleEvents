import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { CircularProgress, IconButton } from "@mui/material";
import { RefObject, useEffect, useRef, useState } from "react";

interface OtpFieldProps {
  callback: (code: string) => void;
  reset: boolean;
  isLoading: boolean;
  error?: string;
  isSuccess?: boolean;
}

export default function OtpField({
  callback,
  reset,
  error,
  isLoading,
  isSuccess,
}: OtpFieldProps) {
  const [code, setCode] = useState("");

  // Refs to control each digit input element
  const inputRefs: RefObject<HTMLInputElement>[] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const resetCode = () => {
    inputRefs.forEach((ref) => {
      if (ref.current) ref.current.value = "";
    });
    inputRefs[0].current?.focus();
    setCode("");
  };

  useEffect(() => {
    if (code.length === 6) {
      callback(code);
    }
  }, [code]);

  useEffect(() => {
    resetCode();
  }, [reset]);

  // Handle input
  function handleInput(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const input = e.target;
    const newCode: string[] = [...code];

    if (/^[a-z]+$/i.test(input.value)) {
      const uc = input.value.toUpperCase();
      newCode[index] = uc;
      if (inputRefs[index].current) {
        inputRefs[index].current!.value = uc;
      }
    } else {
      newCode[index] = input.value;
    }

    setCode(newCode.join(""));
    input.select();

    if (input.value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (index < inputRefs.length - 1) {
      inputRefs[index + 1].current?.select();
    }
  }

  function handleFocus(e: React.FocusEvent<HTMLInputElement>) {
    e.target.select();
  }

  // Handle backspace key
  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) {
    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      e.currentTarget.value === "" &&
      index > 0
    ) {
      e.preventDefault();
      setCode(
        (prevCode) => prevCode.slice(0, index) + prevCode.slice(index + 1)
      );
      inputRefs[index - 1].current?.focus();
    }
  }

  // Capture pasted characters
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedCode = e.clipboardData.getData("text");
    if (pastedCode.length === 6) {
      setCode(pastedCode);
      inputRefs.forEach((inputRef, index) => {
        if (inputRef.current) inputRef.current.value = pastedCode.charAt(index);
      });
    }
  };

  const ClearButton = () => (
    <IconButton
      onClick={resetCode}
      className="text-2xl absolute right-0 sm:right-[-30px] top-1/2 transform -translate-y-1/2"
    >
      <HighlightOffIcon />
    </IconButton>
  );

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex gap-2 relative">
        {[0, 1, 2, 3, 4, 5].map((index) => (
          <input
            className="text-xl sm:text-2xl bg-gray-200 w-8 sm:w-10 rounded-md flex p-2 text-center"
            key={index}
            type="text"
            maxLength={1}
            onChange={(e) => handleInput(e, index)}
            ref={inputRefs[index]}
            autoFocus={index === 0}
            onFocus={handleFocus}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            disabled={isLoading}
          />
        ))}
        {isLoading && (
          <CircularProgress
            className="absolute -right-12 top-2"
            color="secondary"
          />
        )}
        {!isSuccess && !isLoading && code.length ? <ClearButton /> : <></>}
        {isSuccess && (
          <div className="absolute right-[-30px] top-1/2 transform -translate-y-1/2">
            <CheckCircleOutlineIcon className="text-green-500" />
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
