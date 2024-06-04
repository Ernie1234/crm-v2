import { Smile } from "lucide-react";
import Chip from "../Chip";
import Wrapper from "../Wrapper";
import TestimonyCard from "./TestimonyCard";

export default function Testimonial() {
  return (
    <div className="w-full relative overflow-hidden">
      <div className="absolute -top-28 -left-28 border-[3px] border-green-foreground/30 rounded-full h-96 w-96" />
      <div className="absolute -bottom-12 -right-6 border-[3px] border-green-foreground/30 rounded-3xl h-32 w-[28rem]" />
      <Wrapper className="w-full flex flex-col justify-center items-center py-8 lg:py-16">
        <Chip
          Icon={Smile}
          text="Testimonial"
          className="py-1 px-5 rounded-full max-w-fit bg-green-foreground/50 capitalize text-lg text-green font-semibold flex items-center gap-2"
        />
        <h3 className="font-bold max-w-[40rem] text-center text-xl md:text-3xl lg:text-5xl text-green my-4 leading-10">
          Echoes of Success With Our Outstanding Service
        </h3>
        <p className="text-xl  text-gray-500">
          Discover why our clients rave about our exceptional services and
          unparalleled results.
        </p>
        <div className="max-w-screen-lg mx-auto">{/* <TestimonyCard /> */}</div>
      </Wrapper>
    </div>
  );
}
