const VoiceAssetIcon = ({ className }: { className: string}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      width="25" height="25" viewBox="0 0 25 25"
      fill="none"
    >
      <path d="M12.7632 4.22607L12.7632 20.2261" strokeWidth="2" strokeLinecap="round"/>
      <path d="M8.76318 8.22607L8.76318 16.2261" strokeWidth="2" strokeLinecap="round"/>
      <path d="M16.7632 8.22607L16.7632 16.2261" strokeWidth="2" strokeLinecap="round"/>
      <path d="M4.76318 11.2261L4.76318 13.2261" strokeWidth="2" strokeLinecap="round"/>
      <path d="M20.7632 11.2261L20.7632 13.2261" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
};

export default VoiceAssetIcon;