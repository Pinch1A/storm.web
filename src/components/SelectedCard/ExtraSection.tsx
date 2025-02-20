"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link";
interface ExtraItemType {
  name: string;
  description: string;
  link: string;
}

const ExtraContent = ({
  extras = []
}: {
  extras: ExtraItemType[];
}) => {
  return (
    <div className="space-y-4">
      {extras.map((extra: ExtraItemType) => (
        <Card key={extra.name}>
          <CardHeader>
            <CardTitle>{extra.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{extra.description}</p>
            <Link href={extra.link}>{extra.link}</Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ExtraContent;
