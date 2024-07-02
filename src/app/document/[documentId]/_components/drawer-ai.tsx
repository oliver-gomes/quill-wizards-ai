"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { openAI } from "@/utils/open-ai";
import { Loader } from "lucide-react";

interface DrawerProps {
  description: string | null;
}

const DrawerAI = ({ description }: DrawerProps) => {
  const [open, setOpen] = useState(false);
  const [wizardSuggestion, setWizardSuggestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleWizardSuggestion = async () => {
    setIsLoading(true);
    try {
      const response = (await openAI(description!)) as string;
      setWizardSuggestion(response);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("wizard Suggesstion", wizardSuggestion);
  return (
    <div>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger
          className="flex float-right border border-1 py-2 px-4 rounded hover:opacity-80"
          onClick={handleWizardSuggestion}
        >
          Ask Your Wizard 🧙‍♂️
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              🧙‍♂️ Oyyy! Wizard here! am helping you you with your wizarly
              storytelling or resume writing 🪄✨Apereciiiuuummm✨?
            </DrawerTitle>
            {isLoading ? (
              <Loader className="flex mx-auto justify-center animate-spin" />
            ) : (
              <DrawerDescription className="whitespace-pre-wrap">
                {wizardSuggestion.length > 0 && <p>{wizardSuggestion}</p>}
              </DrawerDescription>
            )}
          </DrawerHeader>
          <DrawerFooter></DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default DrawerAI;
