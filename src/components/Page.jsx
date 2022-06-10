function Page({ children, pageName }) {
  return (
    <>
      <div className={`mt-4 ${pageName}`}>
        <div className="container">
          {children}
        </div>
      </div>
    </>
  );
}

export default Page;