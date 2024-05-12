import React from "react";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";
type DetailHeadProps = {
  toolName: string;
  handleClick: (e: { preventDefault: () => void }) => void;
};
export function DetailHead({ toolName, handleClick }: DetailHeadProps) {
  return (
    <div className="flex w-full justify-center items-center">
      <Button
        onClick={handleClick}
        className="
        absolute
        left-4
        text-white 
        font-bold 
        py-2 px-4 rounded-xl"
      >
        <ArrowLeft className="mr-2" />
        Back
      </Button>
      <h1 className="text-3xl font-bold mb-4">{toolName} Results</h1>
    </div>
  );
}
