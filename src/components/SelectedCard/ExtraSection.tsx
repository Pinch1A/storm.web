"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const ExtraContent = ({
  extras = []
}: {
  extras: any;
}) => {
  // Implementa qui il contenuto extra
  return (
    <div className="space-y-4">
      {extras.map((extra: any) => (
        <Card>
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
