type TProps = {
  text: string;
  className: string;
  Icon?: React.ElementType;
};

export default function Chip({ text, className, Icon }: TProps) {
  return (
    <div className={`${className}`}>
      {Icon && <Icon size={20} />}
      {text}
    </div>
  );
}
