
"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PolizzaItemType {
  name: string;
  description: string;
  price: number;
}

const PolizzeSection = ({ polizze }: { polizze: PolizzaItemType[], }) => {

  const mockPolizze = [
    {
      name: "Polizza Vita",
      description: "Dettagli sulla polizza vita...",
      price: 100
    }
  ]
  const polizzeList = (polizze.length > 0 ? polizze : mockPolizze).map((polizza: PolizzaItemType) => ({
    name: polizza.name,
    description: polizza.description,
    price: polizza.price
  }));

  return (
    <div className="space-y-4">
      {polizzeList.map((polizza: PolizzaItemType) => (
        <Card key={polizza.name}>
          <CardHeader>
            <CardTitle>{polizza.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{polizza.description}</p>
            <p>Prezzo: {polizza.price}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PolizzeSection;
