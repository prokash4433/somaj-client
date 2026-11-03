import Banner from "@/components/Banner";
import GallerySection from "@/components/GallerySection";
import HeroSection from "@/components/HeroSection";
import Newsfeed from "@/components/Newsfeed";
import RecentUpcomingEvent from "@/components/RecentUpcomingEvent";

 

export default function Home() {
  return (
     <div>
      <Banner/>
      
      <HeroSection/>
      <RecentUpcomingEvent/>
      <GallerySection/>
      <Newsfeed/>
     </div>
  );
}
