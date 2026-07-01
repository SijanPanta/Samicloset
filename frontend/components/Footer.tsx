export default function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant">
      <div className="flex flex-col md:flex-row justify-between items-start gap-gutter px-margin-mobile md:px-margin-desktop py-section-gap max-w-container-max mx-auto">
        <div className="flex flex-col gap-6 w-full md:w-1/3">
          <h2 className="font-headline-sm text-headline-sm text-on-surface">Samiksha Closet</h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-xs">
            Elevated essentials for the discerning woman. Designed in Paris, crafted globally.
          </p>
          <div className="flex gap-4">
            <a className="material-symbols-outlined text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">facebook</a>
            <a className="material-symbols-outlined text-on-surface-variant hover:text-on-surface transition-colors cursor-pointer">link</a>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 w-full md:w-2/3">
          <div className="flex flex-col gap-4">
            <h4 className="font-label-caps text-label-caps uppercase tracking-widest font-bold mb-2">Shop</h4>
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface hover:underline transition-all" href="#">All Collections</a>
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface hover:underline transition-all" href="#">New Arrivals</a>
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface hover:underline transition-all" href="#">Accessories</a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-label-caps text-label-caps uppercase tracking-widest font-bold mb-2">Support</h4>
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface hover:underline transition-all" href="#">Shipping &amp; Returns</a>
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface hover:underline transition-all" href="#">Privacy Policy</a>
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface hover:underline transition-all" href="#">Contact</a>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="font-label-caps text-label-caps uppercase tracking-widest font-bold mb-2">Social</h4>
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface hover:underline transition-all" href="#">Instagram</a>
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface hover:underline transition-all" href="#">Pinterest</a>
            <a className="font-body-md text-body-md text-on-surface-variant hover:text-on-surface hover:underline transition-all" href="#">TikTok</a>
          </div>
        </div>
      </div>
      <div className="px-margin-mobile md:px-margin-desktop py-8 border-t border-outline-variant/30 max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-center text-[10px] font-label-caps text-outline tracking-widest uppercase">
        <p>&copy; 2024 L&apos;ESSENCE. ALL RIGHTS RESERVED.</p>
        <p>Crafting Timelessness</p>
      </div>
    </footer>
  );
}
