export function SocialProof() {
  return (
    <section className="border-y border-border bg-white">
      <div className="container mx-auto grid grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4">
        {[
          { k: "+5,000", v: "negocios confían en Yamassi" },
          { k: "100%", v: "control de ventas y caja" },
          { k: "4.9/5", v: "en 1,280 reseñas" },
          { k: "S/ 0", v: "plan gratuito para empezar" },
        ].map((stat) => (
          <div key={stat.v} className="text-center">
            <p className="font-serif text-3xl font-black text-primary md:text-4xl">
              {stat.k}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.v}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
export default SocialProof;
