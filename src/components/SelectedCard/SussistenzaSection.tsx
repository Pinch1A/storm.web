
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function SussistenzaSection({ sussistenza, sussiPersons }: { sussistenza: any, sussiPersons: number }) {
  return (
    <div className="flex my-2 p-3 flex-row items-center justify-between rounded-md">
      <div className="flex flex-col">
        <div className="text-gray-500">Sussistenza </div>
        <div className="text-sm text-gray-300">Nucleo familiare di {sussiPersons} elementi</div>
      </div>
      <div className="text-gray-700">{sussistenza?.value ?? "Non disponibile"}</div>
    </div>
  )
}
