import { Link } from "react-router-dom";
// LandingPage.jsx
export default function LandingPage() {
    return (
      <>
        {<div data-layer="Desktop" className="Desktop w-full max-w-screen-xl mx-auto px-10 pb-5 relative bg-white flex flex-col justify-start items-center overflow-hidden">
  <div data-layer="Navigation" data-breakpoint="Desktop" className="Navigation self-stretch flex flex-col justify-start items-center">
  </div>
  <div data-layer="Hero section" className="HeroSection w-full max-w-[1500px] flex flex-col justify-start items-start gap-60 overflow-hidden">
    <div data-layer="Hero Title" className="HeroTitle self-stretch text-center justify-start text-black text-9xl font-normal font-['Crimson_Text'] leading-[102px]">Improve Yourself.</div>
    <div data-layer="Hero image" data-breakpoint="Desktop" className="HeroImage self-stretch h-96 relative bg-indigo-400/40 rounded-[30px]">
      <div data-layer="Ipad" className="Ipad w-[907px] h-[644px] left-[147px] top-[-141px] absolute bg-black rounded-3xl shadow-[0px_-4px_20px_0px_rgba(0,0,0,0.10)] border-l-2 border-r-2 border-t-2 border-white/50 overflow-hidden">
        <img data-layer="Inner screen" className="InnerScreen w-[869.74px] h-[607.44px] left-[18.63px] top-[18.50px] absolute rounded-2xl" src="https://placehold.co/870x607" />
      </div>
    </div>
  </div>
  <div data-layer="Benefits section" className="BenefitsSection w-full max-w-[1500px] pb-28 flex flex-col justify-start items-start">
    <div data-layer="Headline and icons" className="HeadlineAndIcons self-stretch pt-20 pb-14 border-t-[0.50px] border-gray-200 flex flex-col justify-start items-start gap-12">
      <div data-layer="Text" className="Text self-stretch pr-96 flex flex-col justify-start items-start gap-12">
        <div data-layer="Benefits Headline" className="BenefitsHeadline w-[861px] justify-start text-black text-5xl font-normal font-['Crimson_Text'] leading-10">Master the SAT with Smart Precision.</div>
        <div data-layer="Benefits Description" className="BenefitsDescription w-[838px] justify-start text-neutral-500 text-base font-normal font-grotesk leading-tight">Each problem you solve trains the system to generate better ones—based on your weaknesses, goals, and learning pace.</div>
        </div>
      <div data-layer="Icons module" className="IconsModule self-stretch pt-10 inline-flex justify-start items-start gap-5 flex-wrap content-start">
        <div data-layer="Icon lockup 1" className="IconLockup1 flex-1 min-w-64 pr-5 py-10 border-t border-gray-200 inline-flex flex-col justify-start items-start gap-6">
          <div data-svg-wrapper data-layer="Icon 1" className="Icon1 relative">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.05305 3.4998C5.68305 4.8798 5.68305 7.0998 7.05305 8.4698L15.543 16.9498C16.123 17.5398 16.123 18.4998 15.543 19.0698C14.953 19.6598 14.003 19.6598 13.413 19.0698L9.17305 14.8298L10.233 13.7698L6.70305 10.2298L6.34305 10.5898L4.93305 9.1698C4.54305 8.7798 3.91305 8.7798 3.50305 9.1698L2.10305 10.5898C1.71305 10.9998 1.71305 11.6098 2.10305 11.9998L3.50305 13.4098L3.16305 13.7698L6.70305 17.2998L7.76305 16.2398L12.003 20.4998C13.373 21.8498 15.583 21.8498 16.953 20.4998C18.323 19.1198 18.323 16.8998 16.953 15.5398L8.46305 7.0498C7.88305 6.4598 7.88305 5.4998 8.46305 4.9298C9.05305 4.3398 10.003 4.3398 10.593 4.9298L14.833 9.1698L13.773 10.2298L17.303 13.7698L17.663 13.4098L19.073 14.8298C19.463 15.2198 20.103 15.2198 20.503 14.8298L21.903 13.4098C22.293 12.9998 22.293 12.3898 21.903 11.9998L20.503 10.5898L20.843 10.2298L17.303 6.6998L16.243 7.7598L12.003 3.4998C10.633 2.1498 8.42305 2.1498 7.05305 3.4998ZM2.81305 11.2898L4.22305 9.8798L5.64305 11.2898L4.22305 12.7098M18.363 12.7098L19.783 11.2898L21.193 12.7098L19.783 14.1198L18.363 12.7098Z" fill="black"/>
            </svg>
          </div>
          <div data-layer="Text 1" className="Text1 self-stretch flex flex-col justify-start items-start gap-5">
            <div data-layer="Icon 1 Title" className="Icon1Title self-stretch justify-start text-black text-lg font-normal font-['Crimson_Text'] leading-none">Amplify Accuracy</div>
            <div data-layer="Icon 1 Description" className="Icon1Description self-stretch justify-start text-neutral-500 text-base font-normal font-grotesk leading-tight">Target your weakest skills with pinpoint AI-driven insights.</div>
            </div>
        </div>
        <div data-layer="Icon lockup 2" className="IconLockup2 flex-1 min-w-64 pr-5 py-10 border-t border-gray-200 inline-flex flex-col justify-start items-start gap-5">
          <div data-svg-wrapper data-layer="Icon 2" className="Icon2 relative">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.9 17.39C17.64 16.59 16.89 16 16 16H15V13C15 12.7348 14.8946 12.4804 14.7071 12.2929C14.5196 12.1054 14.2652 12 14 12H8V10H10C10.2652 10 10.5196 9.89464 10.7071 9.70711C10.8946 9.51957 11 9.26522 11 9V7H13C13.5304 7 14.0391 6.78929 14.4142 6.41421C14.7893 6.03914 15 5.53043 15 5V4.59C17.93 5.77 20 8.64 20 12C20 14.08 19.2 15.97 17.9 17.39ZM11 19.93C7.05 19.44 4 16.08 4 12C4 11.38 4.08 10.78 4.21 10.21L9 15V16C9 16.5304 9.21071 17.0391 9.58579 17.4142C9.96086 17.7893 10.4696 18 11 18M12 2C10.6868 2 9.38642 2.25866 8.17317 2.7612C6.95991 3.26375 5.85752 4.00035 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 10.6868 21.7413 9.38642 21.2388 8.17317C20.7362 6.95991 19.9997 5.85752 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2Z" fill="black"/>
            </svg>
          </div>
          <div data-layer="Text 2" className="Text2 self-stretch flex flex-col justify-start items-start gap-5">
            <div data-layer="Icon 2 Title" className="Icon2Title self-stretch justify-start text-black text-lg font-normal font-['Crimson_Text'] leading-none">Smarter Practice</div>
            <div data-layer="Icon 2 Description" className="Icon2Description self-stretch justify-start text-neutral-500 text-base font-normal font-grotesk leading-tight">Adjust subject, domain, skill, and difficulty in one click.</div>
            </div>
        </div>
        <div data-layer="Icon lockup 3" className="IconLockup3 flex-1 min-w-64 pr-10 py-10 border-t border-gray-200 inline-flex flex-col justify-start items-start gap-6">
          <div data-svg-wrapper data-layer="Icon 3" className="Icon3 relative">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 5C10.0609 5 11.0783 5.42143 11.8284 6.17157C12.5786 6.92172 13 7.93913 13 9C13 10.0609 12.5786 11.0783 11.8284 11.8284C11.0783 12.5786 10.0609 13 9 13C7.93913 13 6.92172 12.5786 6.17157 11.8284C5.42143 11.0783 5 10.0609 5 9C5 7.93913 5.42143 6.92172 6.17157 6.17157C6.92172 5.42143 7.93913 5 9 5ZM9 15C11.67 15 17 16.34 17 19V21H1V19C1 16.34 6.33 15 9 15ZM16.76 5.36C18.78 7.56 18.78 10.61 16.76 12.63L15.08 10.94C15.92 9.76 15.92 8.23 15.08 7.05L16.76 5.36ZM20.07 2C24 6.05 23.97 12.11 20.07 16L18.44 14.37C21.21 11.19 21.21 6.65 18.44 3.63L20.07 2Z" fill="black"/>
            </svg>
          </div>
          <div data-layer="Text 3" className="Text3 self-stretch flex flex-col justify-start items-start gap-5">
            <div data-layer="Icon 3 Title" className="Icon3Title self-stretch justify-start text-black text-lg font-normal font-['Crimson_Text'] leading-none">Regenerative Learning</div>
            <div data-layer="Icon 3 Description" className="Icon3Description self-stretch justify-start text-neutral-500 text-base font-normal font-grotesk leading-tight">Automatically receive new questions based on your past mistakes.</div>
            </div>
        </div>
        <div data-layer="Icon lockup 4" className="IconLockup4 flex-1 min-w-64 pr-10 py-10 border-t border-gray-200 inline-flex flex-col justify-start items-start gap-6">
          <div data-svg-wrapper data-layer="Icon 4" className="Icon4 relative">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 14L3.5 14.07L8.07 9.5C7.89 8.85 8.06 8.11 8.59 7.59C9.37 6.8 10.63 6.8 11.41 7.59C11.94 8.11 12.11 8.85 11.93 9.5L14.5 12.07L15 12C15.18 12 15.35 12 15.5 12.07L19.07 8.5C19 8.35 19 8.18 19 8C19 7.46957 19.2107 6.96086 19.5858 6.58579C19.9609 6.21071 20.4696 6 21 6C21.5304 6 22.0391 6.21071 22.4142 6.58579C22.7893 6.96086 23 7.46957 23 8C23 8.53043 22.7893 9.03914 22.4142 9.41421C22.0391 9.78929 21.5304 10 21 10C20.82 10 20.65 10 20.5 9.93L16.93 13.5C17 13.65 17 13.82 17 14C17 14.5304 16.7893 15.0391 16.4142 15.4142C16.0391 15.7893 15.5304 16 15 16C14.4696 16 13.9609 15.7893 13.5858 15.4142C13.2107 15.0391 13 14.5304 13 14L13.07 13.5L10.5 10.93C10.18 11 9.82 11 9.5 10.93L4.93 15.5L5 16C5 16.5304 4.78929 17.0391 4.41421 17.4142C4.03914 17.7893 3.53043 18 3 18C2.46957 18 1.96086 17.7893 1.58579 17.4142C1.21071 17.0391 1 16.5304 1 16C1 15.4696 1.21071 14.9609 1.58579 14.5858C1.96086 14.2107 2.46957 14 3 14Z" fill="black"/>
            </svg>
          </div>
          <div data-layer="Text 4" className="Text4 self-stretch flex flex-col justify-start items-start gap-5">
            <div data-layer="Icon 4 Title" className="Icon4Title self-stretch justify-start text-black text-lg font-normal font-['Crimson_Text'] leading-none">Real-Time Analysis</div>
            <div data-layer="Icon 4 Description" className="Icon4Description self-stretch justify-start text-neutral-500 text-base font-normal font-grotesk leading-tight">Review your performance instantly after every session.</div>
            </div>
        </div>
      </div>
    </div>
    <img data-layer="Hero Image" className="HeroImage self-stretch h-[620px] relative rounded-[30px]" src="https://placehold.co/1200x620" />
  </div>
  <div data-layer="Features carousel" className="FeaturesCarousel w-full h-[831px] max-w-[1500px] pb-28 inline-flex justify-start items-start gap-5">
    <div data-layer="Text" className="Text flex-1 self-stretch pt-14 pb-20 border-t border-gray-200 inline-flex flex-col justify-start items-start gap-10">
      <div data-layer="Title" className="Title self-stretch pr-20 flex flex-col justify-start items-start gap-10">
        <div data-layer="Features Title" className="FeaturesTitle self-stretch h-24 justify-start text-black text-5xl font-normal font-['Crimson_Text'] leading-10">Your Next Question Learns From Your Last One.</div>
        <div data-layer="Features Description" className="FeaturesDescription self-stretch justify-start text-neutral-500 text-base font-normal font-grotesk leading-tight">No repetition. No guesswork. Just smart progression.</div>
        </div>
      <div data-layer="List" className="List self-stretch flex flex-col justify-start items-start">
        <div data-layer="List Item 1" className="ListItem1 self-stretch pr-20 py-5 border-t border-gray-200 inline-flex justify-center items-start gap-7">
        <div data-layer="Feature 1 Number" className="Feature1Number justify-start text-neutral-500 text-base font-bold font-grotesk leading-tight">01</div>
        <div data-layer="Feature 1 Description" className="Feature1Description flex-1 justify-start text-black text-base font-normal font-grotesk leading-tight">Mistake-Aware Generation<br/>: Get new questions tailored to what you got wrong.</div>
          </div>
        <div data-layer="List Item 2" className="ListItem2 self-stretch pr-20 py-5 border-t border-gray-200 inline-flex justify-center items-start gap-7">
        <div data-layer="Feature 2 Number" className="Feature2Number justify-start text-neutral-500 text-base font-bold font-grotesk leading-tight">02</div>
        <div data-layer="Feature 2 Description" className="Feature2Description flex-1 justify-start text-black text-base font-normal font-grotesk leading-tight">Fully Customizable Practice<br/>: Choose your subject, domain, skill, and difficulty.</div>
          </div>
        <div data-layer="List Item 3" className="ListItem3 self-stretch pr-20 py-5 border-t border-gray-200 inline-flex justify-center items-start gap-7">
        <div data-layer="Feature 3 Number" className="Feature3Number justify-start text-neutral-500 text-base font-bold font-grotesk leading-tight">03</div>
        <div data-layer="Feature 3 Description" className="Feature3Description flex-1 justify-start text-black text-base font-normal font-grotesk leading-tight">Adaptive Learning Loop<br/>: Each completed quiz feeds directly into your next session.</div>
          </div>
        <div data-layer="List Item 4" className="ListItem4 self-stretch pr-20 py-5 border-t border-gray-200 inline-flex justify-center items-start gap-7">
        <div data-layer="Feature4Number" className="Feature4Number justify-start text-neutral-500 text-base font-bold font-grotesk leading-tight">04</div>
        <div data-layer="Feature 4 Description" className="Feature4Description flex-1 justify-start text-black text-base font-normal font-grotesk leading-tight">No Two Students Get the Same Test<br/>: Every quiz is unique—designed just for you.</div>
          </div>
      </div>
      <div data-layer="Button" data-type="Primary" className="Button size- px-5 py-3.5 bg-blue-100 rounded-full flex flex-col justify-center items-center gap-2.5">
      <Link to="/domains">
  <div data-layer="Learn More" className="LearnMore text-center justify-start text-black text-sm font-bold font-grotesk leading-tight">
    Start Practicing
  </div>
</Link>      </div>
    </div>
    <div data-layer="Features carousel v1" data-state="Default" className="FeaturesCarouselV1 flex-1 self-stretch max-w-[1600px] inline-flex flex-col justify-between items-start">
      <div data-layer="Image" className="Image self-stretch flex-1 p-7 bg-black/5 rounded-[30px] flex flex-col justify-start items-end gap-2.5 overflow-hidden">
        <div data-layer="Controls" className="Controls size- inline-flex justify-start items-start gap-2.5">
          <div data-svg-wrapper data-layer="Arrow Left" className="ArrowLeft">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="10" transform="matrix(-1 0 0 1 40 0)" fill="white"/>
            <path d="M22.5 15L17.5 20L22.5 25V15Z" fill="black"/>
            </svg>
          </div>
          <div data-svg-wrapper data-layer="Arrow right" className="ArrowRight">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="40" height="40" rx="10" fill="white"/>
            <path d="M17.5 15L22.5 20L17.5 25V15Z" fill="black"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div data-layer="Testimonial section" className="TestimonialSection w-full max-w-[1500px] pb-28 inline-flex justify-start items-start gap-5">
    <img data-layer="Image" className="Image flex-1 h-[669.38px] p-2.5 rounded-[30px]" src="https://placehold.co/590x669" />
    <div data-layer="Quote" className="Quote flex-1 self-stretch pl-12 border-t border-gray-200 inline-flex flex-col justify-center items-start gap-12">
      <div data-layer="Testimonial Quote" className="TestimonialQuote self-stretch justify-start text-black text-4xl font-normal font-['Crimson_Text'] leading-10">"This tool helped me improve my SAT Math score by 120 points in 3 weeks. It’s like having a private tutor who never sleeps."</div>
      <div data-layer="Name" className="Name self-stretch flex flex-col justify-start items-start gap-2">
        <div data-layer="Testimonial Name" className="TestimonialName self-stretch justify-start text-black text-base font-normal font-['DM_Sans'] leading-tight">John Smith</div>
        <div data-layer="Testimonial Role" className="TestimonialRole self-stretch justify-start text-lime-800 text-xs font-normal font-['Roboto_Mono'] leading-none">High School Senior</div>
      </div>
    </div>
  </div>
  <div data-layer="How it works section" className="HowItWorksSection w-full max-w-[1500px] pt-20 pb-28 border-t border-gray-200 flex flex-col justify-start items-start gap-20">
    <div data-layer="How It Works Step 1" className="HowItWorksStep1 self-stretch inline-flex justify-between items-start">
      <div data-layer="How It Works Title" className="HowItWorksTitle text-center justify-start text-black text-5xl font-normal font-['Crimson_Text'] leading-10">Map Your Success</div>
      <div data-layer="Button" data-type="Primary" className="Button size- px-5 py-3.5 bg-blue-100 rounded-full inline-flex flex-col justify-center items-center gap-2.5">
      <Link to="/domains">
  <div
    data-layer="Learn More"
    className="LearnMore text-center justify-start text-black text-sm font-bold font-grotesk leading-tight"
  >
    Start Practicing
  </div>
</Link>      </div>
    </div>
    <div data-layer="3-up" className="Up self-stretch inline-flex justify-center items-start gap-5">
      <div data-layer="Lockup 1" className="Lockup1 flex-1 min-w-60 pr-7 pt-14 pb-5 border-t border-gray-200 inline-flex flex-col justify-start items-start gap-14">
      <div data-layer="Step 1 Number" className="Step1Number self-stretch justify-start text-stone-300 text-7xl font-normal font-grotesk leading-[80px]">01</div>
      <div data-layer="How It Works Step 1 Text" className="HowItWorksStep1Text self-stretch flex flex-col justify-start items-start gap-5">
          <div data-layer="Step 1 Title" className="Step1Title self-stretch justify-start text-black text-lg font-normal font-['Crimson_Text'] leading-none">Set Your Focus</div>
          <div data-layer="Step 1 Description" className="Step1Description self-stretch justify-start text-neutral-500 text-base font-normal font-grotesk leading-tight">Select subject, domain, and difficulty</div>
          </div>
      </div>
      <div data-layer="Lockup 2" className="Lockup2 flex-1 min-w-60 pr-7 pt-14 pb-5 border-t border-gray-200 inline-flex flex-col justify-start items-start gap-14">
      <div data-layer="Step 2 Number" className="Step2Number self-stretch justify-start text-stone-300 text-7xl font-normal font-grotesk leading-[80px]">02</div>
      <div data-layer="How It Works Step 2 Text" className="HowItWorksStep2Text self-stretch flex flex-col justify-start items-start gap-5">
          <div data-layer="Step 2 Title" className="Step2Title self-stretch justify-start text-black text-lg font-normal font-['Crimson_Text'] leading-none">Start Practicing</div>
          <div data-layer="Step 2 Description" className="Step2Description self-stretch justify-start text-neutral-500 text-base font-normal font-grotesk leading-tight">Solve customized SAT-style questions</div>
          </div>
      </div>
      <div data-layer="Lockup 3" className="Lockup3 flex-1 min-w-60 pr-7 pt-14 pb-5 border-t border-gray-200 inline-flex flex-col justify-start items-start gap-14">
      <div data-layer="Step 3 Number" className="Step3Number self-stretch justify-start text-stone-300 text-7xl font-normal font-grotesk leading-[80px]">03</div>
      <div data-layer="How It Works Step 3 Text" className="HowItWorksStep3Text self-stretch flex flex-col justify-start items-start gap-5">
          <div data-layer="Step 3 Title" className="Step3Title self-stretch justify-start text-black text-lg font-normal font-['Crimson_Text'] leading-none">Improve Continuously</div>
          <div data-layer="Step 3 Description" className="Step3Description self-stretch justify-start text-neutral-500 text-base font-normal font-grotesk leading-tight">Analyze, regenerate, and grow smarter</div>
          </div>
      </div>
    </div>
  </div>
  <div data-layer="Hero image" className="HeroImage self-stretch pb-10 flex flex-col justify-start items-center gap-2.5">
    <div data-layer="Image container" className="ImageContainer w-full h-[664.29px] max-w-[1500px] max-h-[830.36px] rounded-[30px] inline-flex justify-start items-start gap-2.5 overflow-hidden">
      <img data-layer="Image" className="Image flex-1 self-stretch px-4" src="https://placehold.co/1200x664" />
    </div>
  </div>
  <div data-layer="Centered CTA" className="CenteredCta w-full max-w-[1500px] px-72 py-28 border-t-[0.50px] border-gray-200 flex flex-col justify-start items-center gap-10">
    <div data-layer="CTA Title" className="CtaTitle w-[800px] text-center justify-start text-black text-5xl font-normal font-['Crimson_Text'] leading-10">Join Thousands of Smarter Test-Takers</div>
    <div data-layer="CTA Description" className="CtaDescription self-stretch text-center justify-start text-neutral-500 text-base font-normal font-grotesk leading-tight">Sign up now to gain early access and crush your SAT with confidence.</div>
    <div data-layer="Button linkout" data-state="Default" className="ButtonLinkout size- px-5 py-3.5 bg-indigo-400 rounded-full inline-flex justify-center items-center gap-0.5">
    <div data-layer="Text" className="Text text-center justify-start text-white text-sm font-bold font-grotesk leading-tight">Sign Up</div>
    <div data-svg-wrapper data-layer="Arrow" className="Arrow">
        <svg width="8" height="21" viewBox="0 0 8 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.51037 12.6553V8.7137L6.14939 8.75329L1.23516 13.6732L0.5 12.938L5.41423 8.02379L5.46513 8.66281H1.5066V7.66187L6.5 7.67318V12.6553H5.51037Z" fill="white"/>
        </svg>
      </div>
    </div>
  </div>
  <div data-layer="Footer" className="Footer w-full max-w-[1500px] pt-10 pb-5 border-t border-gray-200 flex flex-col justify-end items-start gap-20">
    <div data-layer="Links" className="Links self-stretch h-10 inline-flex justify-between items-center">
      <div data-layer="Nav Items" className="NavItems size- flex justify-start items-center gap-7">
      <div data-layer="Footer Link 1" className="FooterLink1 text-center justify-start text-black text-sm font-bold font-grotesk leading-tight">Benefits</div>
      <div data-layer="Footer Link 2" className="FooterLink2 text-center justify-start text-black text-sm font-bold font-grotesk leading-tight">Specifications</div>
      <div data-layer="Footer Link 3" className="FooterLink3 text-center justify-start text-black text-sm font-bold font-grotesk leading-tight">How-to</div>
      </div>
    </div>
    <div data-layer="Credits" className="Credits self-stretch inline-flex justify-start items-end gap-10">
      <div data-layer="Footer Logo" className="FooterLogo size- flex justify-start items-end gap-2">
        <div data-svg-wrapper data-layer="Union" className="Union relative">
          <svg width="32" height="71" viewBox="0 0 32 71" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.3379 22.2544L31.751 33.3423L27.9258 36.5796L22.3379 29.98V45.6675H24.8379V70.6675H19.8379V45.6675H17.3379V15.6675H22.3379V22.2544ZM12.4248 45.6665L7.83789 70.6665H2.75L7.33789 45.6665H12.4248ZM4.6748 36.5552L0 34.7798L7.22461 15.6675H12.5752L4.6748 36.5552ZM17.3389 10.6177H12.3389V0.66748H17.3389V10.6177Z" fill="black"/>
          </svg>
        </div>
      </div>
      <div data-layer="Text" className="Text flex-1 flex justify-start items-center gap-4">
      <div data-layer="Footer Copyright" className="FooterCopyright justify-center text-blue-500 text-xs font-normal font-grotesk leading-none">© Q-Bank.</div>
      <div data-layer="Footer Year" className="FooterYear justify-center text-blue-500 text-xs font-normal font-['Roboto_Mono'] leading-none">2025</div>
      </div>
      <div data-layer="Footer Rights" className="FooterRights justify-center text-blue-500 text-xs font-normal font-['Roboto_Mono'] leading-none">All Rights Reserved</div>
    </div>
  </div>
</div>}
      </>
    );
  }
  