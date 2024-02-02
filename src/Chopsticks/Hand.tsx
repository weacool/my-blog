const Hand: React.FC<{ handProp: number }> = ({ handProp }) => {
  const fingerMap: Record<number, string> = {
    1: "/finger1.png",
    2: "/finger2.png",
    3: "/finger3.png",
    4: "/finger4.png",
    5: "/finger5.png",
  };

  return (
    <div>
      <img src={fingerMap[handProp]} className="image" />
    </div>
  );
};

export default Hand;
