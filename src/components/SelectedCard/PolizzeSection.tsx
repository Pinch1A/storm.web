
"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const PolizzeSection = ({ polizze, sussiPersons }: { polizze: any, sussiPersons: number }) => {

  const mockPolizze = [
    {
      name: "Polizza Vita",
      description: "Dettagli sulla polizza vita...",
      price: 100
    }
  ]
  const polizzeList = (polizze.length > 0 ? polizze : mockPolizze).map((polizza: any) => ({
    name: polizza.name,
    description: polizza.description,
    price: polizza.price
  }));

  return (
    <div className="space-y-4">
      {polizzeList.map((polizza: any) => (
        <Card key={polizza.name}>
          <CardHeader>
            <CardTitle>{polizza.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Dettagli sulla polizza</p>
            <p>Prezzo: {polizza.price}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PolizzeSection;
