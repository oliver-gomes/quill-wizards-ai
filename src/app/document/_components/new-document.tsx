"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export const NewDocument = () => {
  const router = useRouter();
  const { toast } = useToast();

  const createNewDoc = async (
    title: string = "Untitled Document",
    description: string = ""
  ) => {
    try {
      const response = await axios.post("/api/document/new", {
        title: title,
        description: description,
      });

      toast({
        title: "Document Successfully Created!",
      });
      router.push(`/document/${response.data.id}`);
    } catch (error) {}
  };

  const TemplateMap = [
    {
      component: (
        <button onClick={() => createNewDoc()}>
          <Card className="w-[150px] hover:border hover:border-blue-500 hover:cursor-pointer">
            <CardHeader></CardHeader>
            <CardContent className="flex justify-center mx-auto">
              <Plus size={80} />
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </button>
      ),
      footer: "Blank Document",
    },
    {
      component: (
        <button
          onClick={() =>
            createNewDoc(
              "Wizardly Template",
              `
              [Exposition] 


              [Rising Action] 


              [Climax] 


              [Falling Action] 

              
              [Denouement]`
            )
          }
        >
          <Card className="w-[150px] hover:border hover:border-blue-500 hover:cursor-pointer">
            <CardHeader></CardHeader>
            <CardContent className="flex justify-center mx-auto">
              <Plus size={80} />
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </button>
      ),
      footer: "Wizardly Template",
    },
    {
      component: (
        <button
          onClick={() =>
            createNewDoc(
              "Resume Template",
              `
              [Name] 


              [Job History] 


              [Projects] 


              [Education] 

              
              [Skills]`
            )
          }
        >
          <Card className="w-[150px] hover:border hover:border-blue-500 hover:cursor-pointer">
            <CardHeader></CardHeader>
            <CardContent className="flex justify-center mx-auto">
              <Plus size={80} />
            </CardContent>
            <CardFooter></CardFooter>
          </Card>
        </button>
      ),
      footer: "Resume Template",
    },
  ];

  return (
    <div className="bg-gray-50 h-[300px] flex flex-row md:flex-col justify-center flex-wrap">
      <div className="flex flex-col space-y-4 w-10/12 mx-auto flex-wrap">
        <h3 className="text-muted-foreground text-sm">Start a new document</h3>
        <div className="flex space-x-4 flex-wrap">
          {TemplateMap.map((template) => (
            <div key={template.footer}>
              {template.component}
              <p className="text-sm mt-2 ml-2">{template.footer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
