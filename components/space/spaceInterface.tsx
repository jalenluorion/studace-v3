"use client";

import { use } from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function Interface({
  promise,
}: {
  promise: { module: string; data: Promise<any> }[];
}) {
  const modules = promise.map((p) => p.module);
  const data = promise.map((p) => p.data);

  const res = use(Promise.all(data));

  return (
    <div className="absolute z-10">
      <Card>
        <h1 className="">spaceGuest</h1>
        {res.map((r, i) => (
          <div className="" key={modules[i]}>
            {modules[i]}: {r}
          </div>
        ))}
      </Card>
    </div>
  );
}
