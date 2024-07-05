interface Props {
  name: string | undefined;
  desc: string | undefined;
}

export default function AboutCommodity({ name, desc }: Props) {
  return (
    <div className="rounded-2xl border-2 bg-background w-full flex flex-col gap-1 p-4">
      <h3 className="font-semibold text-xl capitalize text-foreground">
        about {name}
      </h3>
      <p className="text-base">{desc}</p>
    </div>
  );
}
