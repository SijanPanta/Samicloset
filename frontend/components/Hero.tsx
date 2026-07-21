export default function Hero() {
  return (
    <section className="relative h-[921px] w-full flex items-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url(/)`,
          }}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent z-[1]" />
      <div className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        <div className="max-w-2xl animate-fade-in">
          <span className="font-label-caps text-label-caps uppercase tracking-widest mb-4 block text-white/80">New Season Arrival</span>
          <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg kerning-tight mb-8 text-white">
            Elegance in the<br />Untamed Form
          </h2>
          <button className="group bg-primary text-on-primary px-10 py-5 font-label-caps text-label-caps uppercase tracking-widest hover:bg-neutral-800 transition-all duration-300 inline-flex items-center gap-3">
            Discover Collection
            <span className="material-symbols-outlined text-lg transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
          </button>
        </div>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce hidden md:block">
        <span className="material-symbols-outlined text-white/60 text-3xl">expand_circle_down</span>
      </div>
    </section>
  );
}
