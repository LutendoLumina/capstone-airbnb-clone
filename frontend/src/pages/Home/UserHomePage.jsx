import HeroBanner from "../../components/HeroBanner/HeroBanner";
import InspirationSection from "../../components/InspirationSection/InspirationSection";
import ExperiencesSection from "../../components/ExperiencesSection/ExperiencesSection";
import ShopSection from "../../components/ShopSection/ShopSection";
import FutureGetaways from "../../components/FutureGetaways/FutureGetaways";
import Footer from "../../components/layouts/Footer/Footer";

function UserHomePage() {
  return (
    <div>
      <HeroBanner />
      <InspirationSection />
      <ExperiencesSection />
      <ShopSection />
      <FutureGetaways />
    </div>
  );
}

export default UserHomePage;