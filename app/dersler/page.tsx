import { Suspense } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

async function DersListesi() {
  const supabase = await createClient();
  const { data: dersler, error } = await supabase
    .from("dersler")
    .select("id, ad")
    .order("id");

  if (error) {
    return <p className="mt-4 text-red-600">Hata: {error.message}</p>;
  }

  return (
    <ul className="mt-4 list-disc pl-6">
      {dersler.map((ders) => (
        <li key={ders.id}>{ders.ad}</li>
      ))}
    </ul>
  );
}

export default function Dersler() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Dersler</h1>
      <Suspense fallback={<p className="mt-4">Yükleniyor...</p>}>
        <DersListesi />
      </Suspense>
      <Link href="/" className="mt-4 inline-block underline">
        Ana sayfa
      </Link>
    </main>
  );
}