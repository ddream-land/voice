const ExportIcon = ({ className }: { className: string}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      width="24" height="24" viewBox="0 0 24 24"
      fill="none"
    >
      <path d="M16.44 8.8999C20.04 9.2099 21.51 11.0599 21.51 15.1099V15.2399C21.51 19.7099 19.72 21.4999 15.25 21.4999H8.74001C4.27001 21.4999 2.48001 19.7099 2.48001 15.2399V15.1099C2.48001 11.0899 3.93001 9.2399 7.47001 8.9099" stroke="#A1A1AA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 15.0001V3.62012" stroke="#A1A1AA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M15.35 5.85L12 2.5L8.64999 5.85" stroke="#A1A1AA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default ExportIcon;