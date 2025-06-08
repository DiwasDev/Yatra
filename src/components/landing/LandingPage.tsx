import React from 'react'
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import HeroSection from "@/components/landing/HeroSection";
import Footer from "@/components/landing/Footer";
import Stats from "@/components/landing/Stats";
import Features from "@/components/landing/Features";

function LandingPage() {
    return (
<>
        <MaxWidthWrapper>
            <div className={` w-full`}>
                <div className={`w-full`}>
                    <HeroSection></HeroSection>
                </div>
            </div>
            <div className={`sm:mx-16 mx-6 flex justify-center items-center`}>
                <div className="w-full">
                    <Stats></Stats>
                    <Features></Features>
                </div>
            </div>
            <Footer></Footer>
        </MaxWidthWrapper>
    </>
    )
}

export default LandingPage
