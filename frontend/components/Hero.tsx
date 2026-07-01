import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative h-[921px] w-full flex items-center overflow-hidden">
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          className="w-full h-full object-cover"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBpjJMFjwI8Kp1inT-4LY0OFQLJ_MzrgxVGY1It-1QbJIHWE6Vy7lJuQuxiy_q3Jo5d6zWHNsdgruG75dEQA9ansCoHzMBSKSQf1M3uq2kKEmhJG3WVsghi9n004vkRQwA_x8XiLNzUmwb46_RtQMxbyBYof75tyxlQPhARf2URAJqUhexMIh2iwMQHQMOTpiViQJNUksFX4BTVyCcKtJf_MNld2xHbCoGa38-JfAP2XxBStCEF7g9KqoCBdnDx6STE30S7x5ebeas"
          alt="A cinematic, high-fashion portrait of a woman wearing a minimalist, structured silk trench coat in ivory."
          fill
          priority
        />
      </div>
      <div className="relative z-10 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto w-full">
        <div className="max-w-2xl">
          <span className="font-label-caps text-label-caps uppercase tracking-widest mb-4 block">New Season Arrival</span>
          <h2 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg kerning-tight mb-8">
            Elegance in the<br />Untamed Form
          </h2>
          <button className="bg-primary text-on-primary px-10 py-5 font-label-caps text-label-caps uppercase tracking-widest hover:bg-neutral-800 transition-all duration-300">
            Discover Collection
          </button>
        </div>
      </div>
    </section>
  );
}
