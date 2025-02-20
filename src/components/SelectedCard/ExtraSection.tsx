"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const ExtraContent = ({
  extras = []
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extras: any;
}) => {
  return (
    <div className="space-y-4">
      {extras.map((extra: any) => (
        <Card key={extra.name}>
          <CardHeader>
            <CardTitle>{extra.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Dettagli sul servizio extra 1...</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ExtraContent;
