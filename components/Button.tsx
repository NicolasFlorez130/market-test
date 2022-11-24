interface Props {
  onclick: () => void;
  disabled?: boolean;
  children: any;
}

const Button = ({ onclick, disabled, children }: Props) => {
  return (
    <button
      onClick={onclick}
      disabled={disabled}
      className="m-2 mt-0 rounded-full bg-main px-8 py-2 text-white transition-all disabled:border disabled:border-gray-400 disabled:bg-lightMain disabled:text-gray-400"
    >
      {children}
    </button>
  );
};

export default Button;
