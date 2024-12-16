function CustomAvatar({ name }) {
  return (
    <span className="w-[4rem] h-[4rem] rounded-full text-textPrimary text-2xl text-center flex justify-center items-center border-[1px] border-textSecondary ">
      {name.charAt(0).toUpperCase()}
    </span>
  );
}


export default CustomAvatar;