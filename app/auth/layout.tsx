import { FaCircleCheck } from "react-icons/fa6";
import { HiShieldCheck } from "react-icons/hi";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row max-h-dvh h-full min-h-dvh overflow-y-hidden bg-zinc-50">
      {children}
      <div className="flex-1 bg-cover bg-no-repeat bg-[url('https://s3-alpha-sig.figma.com/img/a39a/4e5a/c930da1932b10cc17e1c5171eac45730?Expires=1719792000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Q~-XcPUgbWhGd8Y9RvNmmqQ6n2IEFvFPcUgotyNmNT22J4GZ4CAQBpKwjQYlOQzeQDVDVY~mNXr0PSBHYyBTUjixWjlzRVq3-Sab6rlK6nNDdYr7T8K1W8itNjc20hCreVg1ZpaDwgMFxsHmx6OrL2K5t-7dQVH4iwmgN4Pk4vG5wJYKnR6FrhvZ4S5X3DDWlYQufSleTvUev2287h4G90RwUQRp-OYDg5mLNGf~rQJ22NrCUKiKJxz9Zv6iTOthlxAnvhvt6lQt-ecfxZnTW-nL7FsDmjwPwxaQPBJyOSTYiyj4RpCkZq3LYsdr9TP--9AtzSOgs5TE~MY4~N~BSg__')] bg-gray-800 shadow-lg relative">
        <div className="w-full h-full bg-gradient-to-b from-green-950/70 to-green-950/0 absolute z-0" />
        <div className="absolute h-full w-full bg px-8 py-12">
          <div className="flex flex-col justify-between h-full">
            <div className="flex flex-col">
              <h3 className="text-white text-4xl font-semibold">
                Start investing in <br /> Agriculture commodity
              </h3>
              <div className="mt-4 flex flex-col gap-1">
                <p className="text-white text-base flex items-center gap-2">
                  <FaCircleCheck className="text-green-500 bg-white rounded-full" />
                  <span>Lorem Ipsum Lorem Ipsum Lorem ipsum</span>
                </p>
                <p className="text-white text-base flex items-center gap-2">
                  <FaCircleCheck className="bg-white fill-green-500 rounded-full" />
                  <span>Lorem Ipsum Lorem Ipsum Lorem ipsum</span>
                </p>
                <p className="text-white text-base flex items-center gap-2">
                  <FaCircleCheck className="text-green-500 bg-white rounded-full" />
                  <span>Lorem Ipsum Lorem Ipsum Lorem ipsum</span>
                </p>
              </div>
            </div>
            <div className="flex">
              <p className="bg-white px-3 py-1 rounded-full flex items-center gap-2 text-blue-600">
                <HiShieldCheck />
                <span>Secured. FDIC Approved</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
