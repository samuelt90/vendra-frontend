import HeroSceneMobile from "./HeroSceneMobile";
import HeroSceneDesktop from "./HeroSceneDesktop";

export default function HeroScene() {
  return (
    <div
      aria-hidden="true"
      className="
        pointer-events-none
        absolute inset-0
        overflow-hidden
      "
    >
      {/* COMPOSICIÓN MÓVIL */}
      <div className="absolute inset-0 md:hidden">
        <HeroSceneMobile />
      </div>

      {/* COMPOSICIÓN DESKTOP */}
      <div className="absolute inset-0 hidden md:block">
        <HeroSceneDesktop />
      </div>
    </div>
  );
}

