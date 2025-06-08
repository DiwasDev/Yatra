import React from 'react'
import MaxWidthWrapper from "@/components/shared/MaxWidthWrapper";
import HeroSection from "@/components/landing/HeroSection";
import Footer from "@/components/landing/Footer";

function LandingPage() {
    return (
<>
        <MaxWidthWrapper>
            <div className={` w-full`}>
                <div className={`w-full`}>
                    <HeroSection></HeroSection>
                </div>
            </div>
            <Footer></Footer>
        </MaxWidthWrapper>
    </>
    )
}

export default LandingPage
