import { Badge } from "@/components/ui/badge";
import { FeaturesSticky } from "@/components/blocks/features-sticky";

export function FeaturesSection() {
  return (
    <section id="funciones" className="w-full bg-white py-20 md:py-28 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <Badge variant="accent">Todo en una sola app</Badge>
          <h2 className="font-serif text-4xl font-black leading-tight tracking-tight text-foreground md:text-5xl text-balance">
            Yamassi reúne todo en un solo lugar
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Ventas, stock, compras y control de caja en una sola app,
            desde el primer día. Sin integrar diez sistemas distintos ni pagar
            de más.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-6xl">
          <FeaturesSticky />
        </div>
      </div>
    </section>
  );
}
export default FeaturesSection;
